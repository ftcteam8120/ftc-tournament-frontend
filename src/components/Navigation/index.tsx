import React, { Component } from 'react';

// Import the stylesheet for this component
import './index.less';

import NavButton from './NavButton';

// Define the property types
interface NavigationProps {
  hideLabels?: boolean;
}

// Define the state types
interface NavigationState { }

interface NavButtonLink {
  icon: string;
  link: string;
  label: string;
}

export default class Navigation extends Component<NavigationProps, NavigationState> {

  private renderNavButton(v: NavButtonLink) {
    return (
      <NavButton
        key={v.link}  
        white
        icon={v.icon}
        label={v.label}
        link={v.link}
        hideLabel={this.props.hideLabels} />
    );
  }
  
  public render() {
    let navButtons: NavButtonLink[] = [
      { icon: 'home', label: 'Tournament', link: '/' },
      { icon: 'matches', label: 'Matches', link: '/matches' },
      { icon: 'rankings', label: 'Rankings', link: '/rankings' },
      { icon: 'teams', label: 'Teams', link: '/teams' }
    ];
    return (
      <div className="navigation">
        {navButtons.map((v) => this.renderNavButton(v))}
      </div>
    );
  }

}