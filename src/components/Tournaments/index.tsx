import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';
import { graphql } from 'react-apollo';
import { push } from 'react-router-redux';
import gql from 'graphql-tag';

import './index.less';

import TitleBar from '../TitleBar';
import TournamentItem from './TournamentItem';

// Define the property types
interface TournamentsProps {
  data: any;
  openEvent: (shortid: string) => void;
}

interface TournamentsState {}

class Tournaments extends Component<TournamentsProps, TournamentsState> {

  // The render function will render the component
  public render() {
    const { errors, loading, events } = this.props.data;
    console.log(this.props.data);
    if (!loading) {
      return (
        <div className="tournaments">
          <TitleBar>
            <div className="tournaments-logo">
              <img src="/img/logo_white.svg" />
              <h1>Tournaments</h1>
            </div>
          </TitleBar>
          <div className="tournaments-content">
            {events.map((event) =>
              <TournamentItem
                onClick={() => this.props.openEvent(event.shortid)}
                key={event.id}
                event={event}
              />  
            )}  
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    openEvent: (shortid: string) => {
      dispatch(push('/event/'+ shortid));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<any, any>(gql`
  query EventsQuery {
    events {
      id
      name
      location {
        address
        description
      }
      description
      start
      end
      shortid
      logo_url
    }
  }
`)(Tournaments));
