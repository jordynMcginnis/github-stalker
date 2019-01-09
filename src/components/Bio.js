import React, { Component } from 'react';

class Bio extends Component {
  render() {
    var Background = this.props.photo;
    const { name, userName, summary, joined, location, repos } = this.props;

    return (
      <div className="Bio">
        <div className='bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
        <span><h2 className='t-name'>{name}</h2></span>
        <div className='bio-info'>
          <h3>@{userName}</h3>
          <p className='sum'>{summary}</p>
          <p>Joined Github: {joined.slice(5,7)}/{joined.slice(8,10)}/{joined.slice(0,4)}</p>
          <p>Location: {location}</p>
          <p>Public Repos: {repos}</p>
        </div>
      </div>
    );
  }
}

export default Bio;