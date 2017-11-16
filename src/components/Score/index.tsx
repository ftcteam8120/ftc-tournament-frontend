import React, { Component } from 'react';

import './index.less';

interface ScoreProps {
  scoreData: any;
}

interface ScoreState {}

export default class Score extends Component<ScoreProps, ScoreState> {

  public render() {
    return (
      <div className="score">
        <table className="score-table">
          
        </table>
      </div>
    );
  }

}
