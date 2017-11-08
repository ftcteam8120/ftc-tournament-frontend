import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';

// Import the stylesheet for this component
import './index.less';

// Define the property types
interface NavButtonProps {
  icon: string;
  label?: string;
  hideLabel?: boolean;
  white?: boolean;
  url?: string;
  onClick?: Function;
  link?: string;
  followLink: (link: string) => void
}

// Define the state types
interface NavButtonState {}

class NavButton extends Component<NavButtonProps, NavButtonState> {
  
  public render() {
    let label;
    if (!(this.props.hideLabel) || !this.props.label) {
      label = <div className="label">{this.props.label}</div>;
    }
    return (
      <div className="nav-button" onClick={(e) => {
        if (this.props.onClick) this.props.onClick(e);
        this.props.followLink(this.props.link);
      }}>
        <div className="icon">
          <img className="icon" src={"/img/icon/" + this.props.icon + (this.props.white ? "_white.svg" : ".svg")} />
        </div>
        {label}
      </div>
    );
  }

}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    followLink: (link: string) => {
      dispatch(push(link));
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavButton);