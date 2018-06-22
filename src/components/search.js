import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input className='search-input' placeholder='Enter username...'/>
      </div>
    );
  }
}

export default Search;