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

import { Event } from '../../../core/types';

const styles = {
  number: {
    marginLeft: 8,
    width: 70,
    textAlign: 'center'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    marginTop: 120,
    marginBottom: 120
  }
};

interface Response {
  event: Event;
}

interface Props {
  eventId: string;
  openTeam: (number: number) => void;
}

class RankingsCard extends Component<ChildProps<Props, Response>> {
  render() {
    const { error, loading, event } = this.props.data;
    return (
      <Paper>
        {loading ? (
          <div style={styles.progressContainer as any}>
            <CircularProgress style={styles.progress} size={64} />  
          </div>
        ) : (
          <List>
            {event.rankings.map((ranking) => (
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
        )}
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
)(graphql<Response, Props>(gql`
  query RankingsCardQuery($id: String!) {
    event(id: $id) {
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
    variables: { id: props.eventId }
  })
})(RankingsCard));