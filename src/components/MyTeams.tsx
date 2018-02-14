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
import TeamItem from './Tournament/cards/Teams/TeamItem';

// Define the property types
interface Props {
  user: User;
}

interface Response {
  user: User;
}

class MyTeams extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    let { error, loading, user } = this.props.data;
    return (
      <div style={styles.view}>
        <TitleBar title="My Teams" />
        {loading ? (
          <div></div>
        ) : (
            <Grid container spacing={16}>
              {user.teams.map((team) => (
                <Grid item key={team.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TeamItem team={team} />
                </Grid>
              ))}
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
  query MyTeamsQuery($user_id: String!) {
    user(id: $user_id) {
      id
      teams {
        id
        name
        number
        affiliation
        city
        state
        country
        website
        photo_url
        banner_url
        colors {
          primary
          secondary
        }
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: { user_id: props.user.id }
  })
})(MyTeams));
