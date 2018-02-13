import React, { Component } from 'react';
import { Typography } from 'material-ui';

interface Props {
  message: string;
  error?: Error;
}

export default class ErrorState extends Component<Props> {
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ display: 'flex', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64, alignItems: 'center' }}>
          <img src="/img/error_robot.svg" style={{ margin: 18 }} />
          <div>
            <Typography variant="display1">{this.props.message}</Typography>
            <Typography variant="caption">{this.props.error.message}</Typography>
          </div>
        </div>
      </div>
    );
  }
}