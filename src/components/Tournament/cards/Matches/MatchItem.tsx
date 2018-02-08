import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { Match, MatchType, Winner } from '../../../../core/types';
import { theme } from '../../../../theme';

import { ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = {
  num: {
    padding: 8,
    width: 70,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  numText: {
    color: 'white',
    textAlign: 'center'
  },
  teams: {
    marginLeft: 78,
    display: 'flex'
  },
  team: {
    margin: 8,
    marginTop: 0,
    marginBottom: 0
  }
};

interface MatchItemProps {
  eventId: string;
  match: Match;
  first?: boolean;
  expanded: boolean;
  onExpand: () => void;
}

export default class MatchItem extends Component<MatchItemProps> {

  getColor(winner: Winner) {
    switch (winner) {
      case Winner.BLUE: {
        return theme.palette.primary.main;
      }
      case Winner.RED: {
        return theme.palette.secondary.main;
      }  
      case Winner.TIE: {
        return theme.palette.grey.A200;
      }
      default: {
        return 'white';
      }  
    }
  }

  render() {
    const match: Match = this.props.match;
    let num: string;
    switch (match.type) {
      case MatchType.QUALIFYING: {
        num = 'Q';
        break;
      }
      case MatchType.SEMIFINAL: {
        num = 'SF';
        break;
      }
      case MatchType.FINAL: {
        num = 'F';
        break;
      }    
    }  
    num += ('-' + match.number);
    if (match.sub) {
      num += ('-' + match.sub);
    }
    const { expanded } = this.props;
    return (
      <ExpansionPanel expanded={expanded} onChange={this.props.onExpand} style={{ position: 'relative', marginTop: expanded ? 16 : 8, marginBottom: expanded ? 16 : 8 }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div style={{ ...styles.num as any, backgroundColor: this.getColor(match.winner), height: expanded ? 88 - 16 : 72 - 16 }}>
            <Typography variant="title" style={{ ...styles.numText, marginTop: expanded ? 22 : 14 }}>{num}</Typography>
          </div>
          <div style={styles.teams}>
            <div style={{ ...styles.team, textAlign: expanded ? 'left' : 'center' }}>
              {match.red_alliance.teams.map((team) => (
                <div key={team.id}>
                  <Typography variant="body2"><b>{team.number}</b> &nbsp; {expanded ? team.name : null}</Typography>
                </div>
              ))}
            </div>
            <Typography variant="subheading" style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}>
              VS
            </Typography>
            <div style={{ ...styles.team, textAlign: expanded ? 'left' : 'center' }}>
              {match.blue_alliance.teams.map((team) => (
                <div key={team.id}>
                  <Typography variant="body2"><b>{team.number}</b> &nbsp; {expanded ? team.name : null}</Typography>
                </div>
              ))}
            </div>
          </div>
          <MediaQuery query="(min-width: 450px)">
            {expanded ? null : (
              <div style={{ marginTop: 12, marginLeft: 'auto', marginRight: 16 }}>
                <Typography variant="title" style={{ display: 'flex' }} >
                  <div style={{ color: theme.palette.secondary.main }}>{match.red_alliance.total}</div> &nbsp; • &nbsp; <div style={{ color: theme.palette.primary.main }}>{match.blue_alliance.total}</div>
                </Typography>
              </div>
            )}
          </MediaQuery>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <table>
              <thead>
                <tr>
                  <th>
                    <Typography variant="caption">Auto</Typography>
                  </th>
                  <th>
                    <Typography variant="caption">Bonus</Typography>
                  </th>
                  <th>
                    <Typography variant="caption">TeleOp</Typography>
                  </th>
                  <th>
                    <Typography variant="caption">Endgame</Typography>
                  </th>
                  <th>
                    <Typography variant="caption">Penalty</Typography>
                  </th>
                  <th>
                    <Typography variant="caption">Total</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Typography variant="body1" color="secondary">{match.red_alliance.auto}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="secondary">{match.red_alliance.auto_b}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="secondary">{match.red_alliance.tele}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="secondary">{match.red_alliance.end}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="secondary">{match.red_alliance.penalty}</Typography>
                  </td>
                  <td>
                    <Typography variant="body2" color="secondary"><b>{match.red_alliance.total}</b></Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1" color="primary">{match.blue_alliance.auto}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="primary">{match.blue_alliance.auto_b}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="primary">{match.blue_alliance.tele}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="primary">{match.blue_alliance.end}</Typography>
                  </td>
                  <td>
                    <Typography variant="body1" color="primary">{match.blue_alliance.penalty}</Typography>
                  </td>
                  <td>
                    <Typography variant="body2" color="primary"><b>{match.blue_alliance.total}</b></Typography>
                  </td>
                </tr>
              </tbody>
            </table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}