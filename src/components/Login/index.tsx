import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';

import './index.less';

import { Input, Button } from '../form';

interface LoginProps {
  authenticated: boolean;
  login: (username: string, password: string) => Action;
  logout: () => Action;
}

interface LoginState {
  username: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {

  private backgroundImage: string;

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  // Generate a random background image
  private getRandomImage(): string {
    let index: number = Math.floor(Math.random() * 5 + 1);
    // First return a gradient to tint the image, then return the image
    return ("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/img/background/bg" + index + ".jpg')");
  }

  componentWillMount() {
    this.backgroundImage = this.getRandomImage();
  }

  private updateValue(target: string, value: any): void {
    this.setState({
      [target]: value
    } as any);
  }

  public render() {
    // Check if the user is authenticated
    if (this.props.authenticated) {
      // Redirect home if they are
      return <Redirect to="/"/>
    } else {
      return (
        <div className="login" style={{ backgroundImage: this.backgroundImage }}>
          <div className="login-container">
            <div className="logo-container">
              <div className="logo-container-inner">
                <img src="/img/logo_white.svg" />
                <h3>FTC Tournament Login</h3>
              </div>
            </div>
            <div className="login-form">
              <div className="login-section">
                <div className="login-section-title">
                  <h5>Username & Password </h5>
                </div>
                <Input
                  value={this.state.username}
                  onChange={(v) => this.updateValue("username", v)}
                  placeholder="Username"
                  className="login-form-element"
                />
                <Input
                  value={this.state.password}
                  type="password"
                  onChange={(v) => this.updateValue("password", v)}
                  placeholder="Password"
                  className="login-form-element"
                />
                <Button
                  onClick={() => { this.props.login(this.state.username, this.state.password) }}
                  label="Login"
                  color="blue"
                  className="login-form-element"
                />
              </div>
              <div className="login-section">
                <div className="login-section-title">
                  <h5>Social Media</h5>
                </div>
                <Button
                  onClick={() => {  }}
                  label="Login with Twitter"
                  color="twitter-blue"
                  className="login-form-element"
                />
                <Button
                  onClick={() => {  }}
                  label="Login with Google"
                  color="google-red"
                  className="login-form-element"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

}

const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username: string, password: string) => {
      dispatch(actions.auth.login(username, password));
    },
    logout: () => {
      dispatch(actions.auth.logout());
    }
  };  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
