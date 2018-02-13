// Import the base Component class from React
import React, { Component } from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';
import MediaQuery from 'react-responsive';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Tabs,
  Tab,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent
} from 'material-ui';
import PeopleIcon from 'material-ui-icons/People';
import GamepadIcon from 'material-ui-icons/Gamepad';
import HomeIcon from 'material-ui-icons/Home';
import FormatListNumberedIcon from 'material-ui-icons/FormatListNumbered';
import { theme } from '../../theme';

import { User, Event } from '../../core/types';

const styles = {
  tabs: {
    position: 'fixed',
    top: 64,
    width: '100vw',
    left: 0,
    right: 0,
    color: 'white',
    zIndex: 1200,
    backgroundColor: '#303f9f'
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
  }
};

// Import other components
import TitleBar from '../TitleBar';
import AppDrawer from '../AppDrawer';

// Import sub screens
import TournamentHome from './screens/Home';
import TournamentMatches from './screens/Matches';
import TournamentRankings from './screens/Rankings';
import TournamentTeams from './screens/Teams';
import AdminTools from './cards/AdminTools';

// Define the property types
interface TournamentProps {
  match: {
    path: string;
    url: string;
    params: {
      event_code: string;
    }
  }
  push: (url: string) => void;
  location: any;
  user: User;
  data: any;
}

// Define the state types
interface TournamentState {
  width: number;
}

class Tournament extends Component<TournamentProps, TournamentState> {

  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => {
      this.updateWindowDimensions();
    });
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateWindowDimensions();
    });
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  handleChange(event, value) {
    switch (value) {
      case 0: {
        this.props.push(this.props.match.url);
        break;
      }
      case 1: {
        this.props.push(this.props.match.url + '/matches');
        break;
      }
      case 2: {
        this.props.push(this.props.match.url + '/rankings');
        break;
      }
      case 3: {
        this.props.push(this.props.match.url + '/teams');
        break;
      }
    }
    window.scrollTo(0, 0);
  }

  getCurrentTab() {
    if (this.props.location.pathname.indexOf('matches') > -1) return 1;
    if (this.props.location.pathname.indexOf('rankings') > -1) return 2;
    if (this.props.location.pathname.indexOf('teams') > -1) return 3;
    return 0;
  }

  public render() {
    const { error, loading, event }: { error: any, loading: boolean, event: Event } = this.props.data;
    let tabsStyle;
    if (this.state.width > theme.breakpoints.values.md) {
      tabsStyle = {
        left: 250,
        width: `calc(100% - ${250}px)`
      };
    }
    return (
      <div style={{ marginTop: (this.state.width > 800) ? 120 : 72, marginBottom: 72 }}>
        <TitleBar backTo="/events" title={loading ? 'Loading' : event.name}>
          <MediaQuery query="(min-width: 800px)">
            <Tabs
              value={this.getCurrentTab()}
              onChange={(e, v) => this.handleChange(e, v)}
              fullWidth
              centered
              indicatorColor="secondary"
              style={{...styles.tabs, ...tabsStyle}}
            >
              <Tab label="EVENT" />
              <Tab label="MATCHES" />
              <Tab label="RANKINGS" />
              <Tab label="TEAMS" />
            </Tabs>
          </MediaQuery>
        </TitleBar>
        { !loading && <AdminTools event={event} user={this.props.user}/> }
        <Route exact path={this.props.match.path} component={TournamentHome} />
        <Route exact path={this.props.match.path + '/matches'} component={TournamentMatches} />
        <Route exact path={this.props.match.path + '/rankings'} component={TournamentRankings} />
        <Route exact path={this.props.match.path + '/teams'} component={TournamentTeams} />
        <MediaQuery query="(max-width: 800px)">
          <BottomNavigation
            value={this.getCurrentTab()}
            onChange={(e, v) => this.handleChange(e, v)}
            showLabels
            style={styles.nav as any}
          >
            <BottomNavigationAction label="Event" icon={<HomeIcon />} />
            <BottomNavigationAction label="Matches" icon={<GamepadIcon />} />
            <BottomNavigationAction label="Rankings" icon={<FormatListNumberedIcon />} />
            <BottomNavigationAction label="Teams" icon={<PeopleIcon />} />
          </BottomNavigation>
        </MediaQuery>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  user: state.auth.user
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    push: (url: string) => {
      dispatch(push(url));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<any, any>(gql`
  query EventQuery($code: String) {
    event(code: $code) {
      id
      name
      start
      end
      description
      location {
        address
      }
      admins {
        id
      }
    }
  }
`, {
  options: (props: TournamentProps) => ({
    variables: {
      code: props.match.params.event_code
    }
  })
})(Tournament));
