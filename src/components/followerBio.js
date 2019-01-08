import React, { Component } from 'react';

class FollowerBio extends Component {
  render() {
    var Background = this.props.photo;
    return (
      <div className="follower-bio">
        <div className='follower-bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <h1>{this.props.name}</h1>
        <div className='bio-info'>
          <h3><span>@{this.props.userName}</span></h3>
          <p className='sum'> {this.props.summary} </p>
          <p><span>Joined Github:</span> {this.props.joined.slice(5,7)}/{this.props.joined.slice(8,10)}/{this.props.joined.slice(0,4)}</p>
          <p><span>Location:</span> {this.props.location}</p>
          <p><span>Public Repos:</span> {this.props.repos}</p>
        </div>
      </div>
    );
  }
}

export default FollowerBio;