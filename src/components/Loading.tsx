import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

const styles = {
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    marginTop: 120
  }
};

export default class Loading extends Component {
  render() {
    return (
      <div style={styles.progressContainer as any}>
        <CircularProgress style={styles.progress} size={64} />
      </div>
    );
  }
}