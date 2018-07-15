import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input className='search-input' placeholder='Enter username... like jordynMcginnis' onKeyPress={(e) => e.key === 'Enter' ? this.props.handleClick(e) : null}/>
      </div>
    );
  }
}

export default Search;