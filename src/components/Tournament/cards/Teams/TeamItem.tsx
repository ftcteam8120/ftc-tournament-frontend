import React, { Component } from 'react';
import { Card, CardContent, CardActions, Button, Typography, MuiThemeProvider, Avatar } from 'material-ui';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

import { Team } from '../../../../core/types';

import { getTeamTheme } from '../../../../utils/teamThemes';

const styles = {
  root: {
    height: 200,
    minWidth: 250,
    cursor: 'pointer'
  }
}

interface Props {
  team: Team;
  onClick?: () => void;
}

export default class TeamItem extends Component<Props> {
  render() {
    const { team } = this.props;
    let theme;
    if (team.colors) {
      theme = getTeamTheme(team.colors.primary, team.colors.secondary);
    } else {
      theme = getTeamTheme(null, null);
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Card style={styles.root} onClick={this.props.onClick}>
          <div style={{ backgroundColor: theme.palette.primary.main, paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}>
            <Typography variant="headline" style={{ color: theme.palette.primary.contrastText }}>
              {team.number}
            </Typography>
          </div>
          <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              style={{
                height: 64,
                width: 64,
                backgroundColor: theme.palette.secondary.main
              }}
              src={team.photo_url}
            >
              {!team.photo_url && <Typography variant="title" style={{ color: theme.palette.secondary.main.contrastText }}>{team.name.substr(0, 1).toUpperCase()}</Typography>}
            </Avatar>
            <div style={{ marginLeft: 16 }}>
              <Typography variant="title">
                <ResponsiveEllipsis
                  text={team.name}
                  maxLine={2}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Typography>
              <Typography variant="subheading">
                <ResponsiveEllipsis
                  text={team.affiliation}
                  maxLine={2}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Typography>
              <Typography variant="body1">{team.city}, {team.state} {team.country}</Typography>
            </div>
          </CardContent>
        </Card>
      </MuiThemeProvider>
    );
  }
}