import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
class Search extends Component {
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input className='search-input' placeholder='Enter username...'/>
      </div>
    );
  }
}

export default Search;