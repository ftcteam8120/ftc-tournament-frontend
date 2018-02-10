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
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Typography, AppBar, Toolbar, Avatar, MuiThemeProvider, Tab, Tabs, BottomNavigationAction, BottomNavigation } from 'material-ui';
import EventIcon from 'material-ui-icons/Event';
import HomeIcon from 'material-ui-icons/Home';
import GamepadIcon from 'material-ui-icons/Gamepad';

import sizeMe from 'react-sizeme';
import Waypoint from 'react-waypoint';

import { Team } from '../../core/types';
import { getTeamTheme, backgroundImageTheme } from '../../utils/teamThemes';

// Import other components
import TitleBar from '../TitleBar';
import TeamMatches from './screens/Matches';
import TeamHome from './screens/Home';

// Define the property types
interface TeamProps {
  match: {
    path: string;
    url: string;
    params: {
      id: string;
    }
  }
  push: (url: string) => void;
  location: any;
  size: any;
}

interface TeamResponse {
  team: Team;
}

// Define the state types
interface TeamState {
  collapsed: boolean;
}

class Tournament extends Component<ChildProps<TeamProps, TeamResponse>, TeamState> {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  handleChange(event, value) {
    switch (value) {
      case 0: {
        this.props.push(this.props.match.url);
        break;
      }
      case 1: {
        this.props.push(this.props.match.url + '/events');
        break;
      }
      case 2: {
        this.props.push(this.props.match.url + '/matches');
        break;
      }
    }
    window.scrollTo(0, 0);
  }

  getCurrentTab() {
    if (this.props.location.pathname.indexOf('events') > -1) return 1;
    if (this.props.location.pathname.indexOf('matches') > -1) return 2;
    return 0;
  }

  collapse(value: boolean) {
    this.setState({ collapsed: value });
  }

  public render() {
    const { error, loading, team } = this.props.data;
    const { collapsed } = this.state;
    const { width, height } = this.props.size;
    const mobile = width < 600;
    let titleComponent;
    if (collapsed && !loading) {
      titleComponent = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {team.photo_url && (<Avatar style={{ height: 32, width: 32 }} src={team.photo_url} />)}
          <Typography style={{ marginLeft: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} variant="title" color="inherit">{team.name}</Typography>
        </div>
      );
    }
    let theme;
    let titleBarStyle;
    let bannerBkg;
    if (!loading) {
      if (team.banner_url) {
        bannerBkg = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${team.banner_url})`;
        if (!collapsed) {
          titleBarStyle = {
            background: 'transparent'
          };
          theme = backgroundImageTheme(team.colors.secondary);
        }
        if (collapsed) {
          theme = getTeamTheme(team.colors.primary, team.colors.secondary);
        }
      } else if (team.colors) {
        theme = getTeamTheme(team.colors.primary, team.colors.secondary);
      } else {
        theme = getTeamTheme(null, null);
      }
    } else {
      theme = getTeamTheme(null, null);
    }
    let tabs = (
      <MediaQuery query="(min-width: 801px)">
        <Tabs
          value={this.getCurrentTab()}
          onChange={(e, v) => this.handleChange(e, v)}
          fullWidth
          indicatorColor="secondary"
          centered
          style={{
            marginTop: 'auto',
            width: '100%'
          }}
        >
          <Tab label="TEAM" />
          <Tab label="EVENTS" />
          <Tab label="MATCHES" />
        </Tabs>
      </MediaQuery>
    );
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          {collapsed && (
            <TitleBar
              showBack={true}
              backTo="/"
              titleComponent={titleComponent}
              elevation={2}
              style={{
                height: mobile ? 56 : 112
              }}
            >
              {!mobile && tabs}
            </TitleBar>
          )}
          <Waypoint
            onLeave={() => this.collapse(true)}
            onEnter={() => this.collapse(false)}
            topOffset={mobile ? 56 : 112}
          >
            <div>
              <AppBar style={{ height: mobile ? 500 : 350, backgroundImage: bannerBkg, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} position="static">
                <TitleBar
                  position="static"
                  showBack={true}
                  backTo="/"
                  title={loading ? null : String(team.number)}
                  elevation={0}
                  style={titleBarStyle}
                />
                <Toolbar style={{ display: 'block' }}>
                  {loading ? null : (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ display: mobile ? 'block' : 'flex', alignItems: 'center', textAlign: mobile ? 'center' : 'left' }}>
                        <Avatar style={{ height: 156, width: 156, marginLeft: mobile ? 'auto' : 0, marginRight: mobile ? 'auto' : 0, backgroundColor: theme.palette.secondary.main }} src={team.photo_url}>
                          {!team.photo_url && <Typography variant="display2" style={{ color: theme.palette.secondary.main.contrastText }}>{team.number}</Typography>}
                        </Avatar>
                        <div style={{ marginLeft: mobile ? 0 : 32, marginTop: mobile ? 32 : 0 }}>
                          <Typography variant="display2" color="inherit">{team.number}</Typography>
                          <Typography variant="display1" color="inherit" style={{ marginTop: 8, marginBottom: 8 }}>{team.name}</Typography>
                          <Typography variant="subheading" color="inherit">{team.affiliation}</Typography>
                          <Typography variant="title" color="inherit">{(team.city + ' ' + team.state + ', ' + team.country)}</Typography>
                        </div>
                      </div>
                      <br />
                      <div style={{ marginLeft: mobile ? 0 : 190, textAlign: mobile ? 'center' : 'left' }}>
                        <a href={team.website} style={{ color: 'white' }} target="_blank">
                          <Typography variant="body2" color="inherit">
                            {team.website}
                          </Typography>
                        </a>
                        <a href={'https://twitter.com/' + team.twitter} style={{ color: 'white' }} target="_blank">
                          <Typography variant="body2" color="inherit">
                            {team.twitter && ('@' + team.twitter)}
                          </Typography></a>
                      </div>
                    </div>
                  )}
                </Toolbar>
                {tabs}
              </AppBar>
            </div>
          </Waypoint>
        </MuiThemeProvider>
        <div style={{ marginTop: 16, marginBottom: 64 }}>
          <Route exact path={this.props.match.path} component={TeamHome} />
          <Route exact path={this.props.match.path + '/matches'} component={TeamMatches} />
        </div>
        <MediaQuery query="(max-width: 800px)">
          <BottomNavigation
            value={this.getCurrentTab()}
            onChange={(e, v) => this.handleChange(e, v)}
            showLabels
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%'
            }}
          >
            <BottomNavigationAction label="Team" icon={<HomeIcon />} />
            <BottomNavigationAction label="Events" icon={<EventIcon />} />
            <BottomNavigationAction label="Matches" icon={<GamepadIcon />} />
          </BottomNavigation>
        </MediaQuery>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    push: (url: string) => {
      dispatch(push(url));
    }
  };  
};

export default sizeMe()(connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql<TeamResponse, TeamProps>(gql`
  query TeamQuery($id: String, $number: Int) {
    team(id: $id, number: $number) {
      id
      shortid
      name
      number
      city
      state
      country
      affiliation
      website
      photo_url
      biography
      twitter
      banner_url
      colors {
        primary
        secondary
      }
    }
  }
`, {
    options: (props: TeamProps) => {
      try {
        let num = parseInt(props.match.params.id);
        return {
          variables: {
            number: num
          }
        };
      } catch {
        return {
          variables: {
            id: props.match.params.id
          }
        };
      }
      
    }
})(Tournament)));
