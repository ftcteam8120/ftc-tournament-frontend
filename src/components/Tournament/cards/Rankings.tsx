import React, { Component } from 'react';
import { push } from 'react-router-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Paper, Typography, CircularProgress } from 'material-ui';

import EmptyState from '../../EmptyState';
import ErrorState from '../../ErrorState';
import Loading from '../../Loading';

import { Event } from '../../../core/types';

const styles = {
  number: {
    marginLeft: 8,
    width: 70,
    textAlign: 'center'
  }
};

interface Response {
  event: Event;
}

interface Props {
  eventCode: string;
  subscribeToRankingUpdates?: ({ eventId: string }) => void;
  openTeam: (number: number) => void;
}

class RankingsCard extends Component<ChildProps<Props, Response>> {
  
  componentWillMount() {
    this.props.subscribeToRankingUpdates({
      eventId: this.props.eventCode
    });
  }

  render() {
    const { error, loading, event } = this.props.data;
    let content;
    let rankings;
    if (event) rankings = event.rankings || [];
    else rankings = [];
    if (error) {
      content = <ErrorState message="Error Loading Rankings" error={error} />;
    } else if (!event || rankings.length === 0) {
      content = <EmptyState message="No Rankings Found" />;
    } else {
      content = (
        <List>
          {rankings.map((ranking) => (
            <ListItem key={ranking.rank + ranking.team.id} onClick={() => this.props.openTeam(ranking.team.number)} button>
              <Avatar>
                {ranking.rank}
              </Avatar>
              <Typography style={styles.number} variant="title">
                {ranking.team.number}
              </Typography>
              <ListItemText
                primary={ranking.team.name}
                secondary={'RP: ' + ranking.ranking_points + ' QP: ' + ranking.qualifying_points + ' Highest: ' + ranking.highest}
              />
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <Paper>
        {loading ? (
          <Loading/>
        ) : content}
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    openTeam: (number: number) => {
      dispatch(push('/team/'+number));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql <Response, Props>(gql`
query RankingsCardQuery($code: String) {
  event(code: $code) {
    id
    rankings {
      rank
      ranking_points
      qualifying_points
      highest
      team {
        id
        name
        number
      }
    }
  }
}
`, {
options: (props: Props) => ({
  variables: {
    code: props.eventCode
  }
}),
    props: props => {
      return {
        ...props,
        subscribeToRankingUpdates: params => {
          return props.data.subscribeToMore({
            document: gql`
              subscription SubscribeToRankingUpdates($event: String!) {
                rankingsUpdated(event: $event) {
                  rank
                  ranking_points
                  qualifying_points
                  highest
                  team {
                    id
                    name
                    number
                  }
                }
              }
            `,
            variables: {
              event: params.eventId,
            },
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
              let rankings = prev.event.rankings;
              if (subscriptionData.data) {
                if (subscriptionData.data.rankingsUpdated) {
                  if (subscriptionData.data.rankingsUpdated[0].number !== null) {
                    rankings = subscriptionData.data.rankingsUpdated;
                    console.log('Recieved data', new Date(Date.now()).toISOString());
                  }
                }
              }
              return {
                event: {
                  ...prev.event,
                  rankings: rankings || []
                }
              };
            }
          });
        }
      };
  }  
})(RankingsCard));