import React, { Component } from 'react';

import './index.less';

interface TournamentItemProps {
  event: any;
  onClick?: (event: any) => void;
}

export default class TournamentItem extends Component<TournamentItemProps> {
  render() {
    let address;
    if (this.props.event.location) {
      address = <p>{this.props.event.location.address}</p>;
    }
    return (
      <div className="tournament-item" onClick={this.props.onClick}>
        <h2>{this.props.event.name}</h2>
        {address}
        <p>{this.props.event.description}</p>
        <p>{new Date(this.props.event.start).toDateString()} - {new Date(this.props.event.end).toDateString()}</p>
      </div>
    )
  }
}