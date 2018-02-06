import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ReduxCache } from 'apollo-cache-redux';
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

declare const API_URL: string;
declare const WS_API_URL: string;

export function configureClient(store) {
  const client = new SubscriptionClient(WS_API_URL, {
    reconnect: true,
  });
  const link = new WebSocketLink(client);
  return  new ApolloClient({
    link,
    cache: new ReduxCache({ store })
  });
  /*return new ApolloClient({
    link: new HttpLink({ uri: API_URL + '/graphql' }),
    cache: new ReduxCache({ store })
  });*/
}