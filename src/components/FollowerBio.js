import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FollowerBio extends Component {
  render() {
    const Background = this.props.photo;
    const { username, name } = this.props;
    const link = `https://github.com/${username}`;

    return (
      <div className="follower-bio">
        <div className='follower-bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <Link to={username}>
          <h1 className='h-link'>{name}</h1>
        </Link>
        <div className='follower-bio-info'>
          <a target="blank" href={link}><h3>@{username}</h3></a>
        </div>
      </div>
    );
  }
}

export default FollowerBio;
