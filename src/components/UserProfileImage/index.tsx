import React, { Component } from 'react';

import './index.less';

interface UserProfileImageProps {
  user: any;
  size?: number;
}

interface UserProfileImageState {}

export class UserProfileImage extends Component<UserProfileImageProps, UserProfileImageState> {

  public render() {
    let style;
    let textStyle;
    if (this.props.size) {
      style = {
        height: this.props.size,
        width: this.props.size,
        borderRadius: this.props.size / 2
      };
      textStyle = {
        fontSize: (this.props.size / 150) * 64,
        paddingTop: (this.props.size / 150) * 32
      }
    }
    if (!this.props.user.photos) {
      return (
        <div className="user-profile-image" style={style}>
          <div className="user-profile-image-text" style={textStyle}>
            {this.props.user.name.givenName.substr(0, 1) + this.props.user.name.familyName.substr(0, 1)}
          </div>
        </div>
      );
    } else {
      return (
        <img className="user-profile-image" src={this.props.user.photos[0].value} />
      );
    }
  }

}
