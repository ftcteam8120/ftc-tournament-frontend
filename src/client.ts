import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ReduxCache } from 'apollo-cache-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { store } from './';

declare const API_URL: string;
declare const WS_API_URL: string;

function getAuth() {
  return store.getState().auth.token;
}

export function configureClient(store) {
  // Create a HTTP link
  const httpLink = new HttpLink({
    uri: API_URL + '/graphql',
  });
    // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: WS_API_URL + '/websocket',
    options: {
      reconnect: true
    }
  });
  const splitLink = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${store.getState().auth.token}` || null
      }
    });
    return forward(operation);
  });
  const link = middlewareLink.concat(splitLink);
  return new ApolloClient({
    link,
    cache: new ReduxCache({ store })
  });
}