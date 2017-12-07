import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../core';
import { AuthError } from '../../core/actions/auth';

import './index.less';

import { Button } from '../form';

import { UserProfileImage } from '../UserProfileImage';

 // paramters
interface HomePageProps {

}

 // state of the home page
interface HomePageState {
}

interface UserButton {
  name: string
  key: string
  onClick: Function
}


class HomePage extends Component<HomePageProps, HomePageState> {

  private backgroundImage: string;

  constructor() {
    super();
    this.state = {};
  }

  private userButtons: UserButton[] = [
    {
      name: "My Profile",
      key: "myProfile",
      onClick: () => {}
    },
    {
      name: "Tournaments",
      key: "tournaments",
      onClick: () => {}
    }
  ]

  private getRandomImage(): string {
    let index: number = Math.floor(Math.random() * 5 + 1);
    // First return a gradient to tint the image, then return the image
    return ("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/img/background/bg" + index + ".jpg')");
  }

  private renderButtons(buttons: UserButton[]) {
    let elements;
    for (let i = 0; i < buttons.length; i++) {
      elements.push(
        <Button
          onClick={() => { buttons[i].onClick() }}
          label={buttons[i].name}
          color="gray"
          key={buttons[i].key}
        />
      )
    }
    return elements;
  }

  componentWillMount() {
    this.backgroundImage = this.getRandomImage();
  }

  public render() {
    let testUser = {
      name: {
        givenName: "Kirk",
        familyName: "Brauer"
      },
      userType: "user"
    };
    let buttons;
    switch (testUser.userType) {
      case "user":
        buttons = this.renderButtons(this.userButtons);
        break;
    
      default:
        break;
    }
    return (
      <div className="home-page" style={{ backgroundImage: this.backgroundImage }}>
        <div className="page-body">
          <UserProfileImage user={testUser} size={150} />
          {buttons};
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
)(HomePage);
