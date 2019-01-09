import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FollowerBio extends Component {
  render() {
    const Background = this.props.photo;
    const { userName, name } = this.props;
    return (
      <div className="follower-bio">
        <div className='follower-bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <Link to={userName}>
          <h1 className='h-link'>{name}</h1>
        </Link>
        <div className='follower-bio-info'>
          <h3>@{userName}</h3>
        </div>
      </div>
    );
  }
}

export default FollowerBio;