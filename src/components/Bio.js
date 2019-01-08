import React, { Component } from 'react';

class Bio extends Component {
  render() {
    var Background = this.props.photo;
    return (
      <div className="Bio">
        <div className='bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <span><h2 className='t-name'>{this.props.name}</h2></span>
        <div className='bio-info'>
          <h3>@{this.props.userName}</h3>
          <p className='sum'> {this.props.summary} </p>
          <p>Joined Github: {this.props.joined.slice(5,7)}/{this.props.joined.slice(8,10)}/{this.props.joined.slice(0,4)}</p>
          <p>Location: {this.props.location}</p>
          <p>Public Repos: {this.props.repos}</p>
        </div>
      </div>
    );
  }
}

export default Bio;