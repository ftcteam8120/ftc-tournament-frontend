import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../core';
import { graphql, ChildProps } from 'react-apollo';
import { push } from 'react-router-redux';
import gql from 'graphql-tag';
import { Toolbar, Typography, Grid } from 'material-ui';

const styles = {
  view: {
    marginTop: 80,
    marginLeft: 16,
    marginRight: 16
  }
};

import { User } from '../core/types';

import TitleBar from './TitleBar';
import TournamentItem from './Tournaments/TournamentItem';

// Define the property types
interface Props {
  user: User;
}

interface Response {
  user: User;
}

class MyEvents extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    let { error, loading, user } = this.props.data;
    return (
      <div style={styles.view}>
        <TitleBar title="My Events" />
        {loading ? (
          <div></div>
        ) : (
            <Grid container spacing={16}>
              {user.events.map((event) =>
                <Grid item key={event.id} md={6} sm={6} xs={12} lg={4} xl={3}>
                  <TournamentItem
                    event={event}
                  />
                </Grid>
              )}
            </Grid>
          )}
        
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<any, any>(gql`
  query MyEventsQuery($user_id: String!) {
    user(id: $user_id) {
      id
      events {
        id
        name
        code
        location {
          address
          description
        }
        description
        start
        end
        logo_url
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { user_id: props.user.id }
  })
})(MyEvents));
