import React, { Component } from 'react';
import { Typography } from 'material-ui';

interface Props {
  message: string;
}

export default class EmptyState extends Component<Props> {
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ display: 'flex', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginBottom: 64, marginTop: 64, alignItems: 'center' }}>
          <div>
            <Typography variant="display1">{this.props.message}</Typography>
          </div>
        </div>
      </div>
    );
  }
}