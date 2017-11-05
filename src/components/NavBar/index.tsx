import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';

import './index.less';

interface NavBarProps { }

interface NavBarState { }

interface Page {
  name: string;
  url: string;
  img: string;
}

class NavBar extends Component<NavBarProps, NavBarState> {

  private renderPageButton(page: Page) {
    return (
      <div className="navbar-button" key={page.name}>
        <img className="navbar-button-icon" src={page.img} />
      </div>
    );
  }

  public render() {
    let pages: Page[] = [
      { name: "Scores", url: "/scores", img: "/img/pages/scores.svg" },
      { name: "Matches", url: "/matches", img: "/img/pages/matches.svg" },
      { name: "Ranks", url: "/ranks", img: "/img/pages/ranks.svg" },
      { name: "Teams", url: "/teams", img: "/img/pages/teams.svg" }
    ];
    return (
      <div className="navbar">
        <div className="navbar-button-container">
          {pages.map((p) => this.renderPageButton(p))}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);