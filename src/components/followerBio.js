import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FollowerBio extends Component {
  render() {
    var Background = this.props.photo;
    return (
      <div className="follower-bio">
        <div className='follower-bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <Link to={this.props.userName}>
          <h1>{this.props.name}</h1>
        </Link>
        <div className='follower-bio-info'>
          <h3>@{this.props.userName}</h3>
        </div>
      </div>
    );
  }
}

export default FollowerBio;