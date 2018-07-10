import React, { Component } from 'react';

class Bio extends Component {
  render() {
    return (
      <div className="Bio">
        <div className='bio-photo'></div>
        <h1>{this.props.name}</h1>
        <h3>{this.props.userName}</h3>
        <p>{this.props.summary}</p>
        <p>Joined Github: {this.props.joined.slice(0,10)}</p>
        <p>Location: {this.props.location}</p>
        <p>Public Repos: {this.props.repos}</p>
      </div>
    );
  }
}

export default Bio;