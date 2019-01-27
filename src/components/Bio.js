import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Bio extends Component {
  render() {
    const Background = this.props.photo;
    const { name, userName, summary, joined, location, repos } = this.props;
    const githubUrl = `https://github.com/${userName}`;
    return (
      <div className="Bio">
        <div className='bio-photo' style={{backgroundImage: "url(" + Background + ")"}}></div>
          <span><h2 className='t-name'><Link to={userName}>{name}</Link></h2></span>
        <div className='bio-info'>
          <a href={githubUrl}>
            <h3>@{userName}</h3>
          </a>
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