import { createMuiTheme } from 'material-ui';
import * as colors from 'material-ui/colors';

export function backgroundImageTheme(secondary: string) {
  let secondaryColor;
  if (colors[secondary]) {
    secondaryColor = colors[secondary];
  } else {
    secondaryColor = colors.red
  }
  return createMuiTheme({
    palette: {
      primary: colors.indigo,
      secondary: secondaryColor
    }
  });
}

export function getTeamTheme(primary: string, secondary: string) {
  if (colors[primary] && colors[secondary]) {
    return createMuiTheme({
      palette: {
        primary: colors[primary],
        secondary: colors[secondary]
      }
    });
  } else {
    return createMuiTheme({
      palette: {
        primary: colors.blueGrey,
        secondary: colors.blue
      }
    });
  }
}