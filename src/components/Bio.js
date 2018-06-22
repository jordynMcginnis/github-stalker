import React, { Component } from 'react';

class Bio extends Component {
  render() {
    return (
      <div className="Bio">
        <div className='bio-photo'></div>
        <h1>{this.props.name}</h1>
        <h3>{this.props.userName}</h3>
        <p>{this.props.summary}</p>
      </div>
    );
  }
}

export default Bio;