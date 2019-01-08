import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  handleKey = ({target}) => {
    const value = target.value;
    this.setState(({value}));
  }
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input className='search-input' placeholder='Enter username... like jordynMcginnis' onChange={this.handleKey}/>
        <Link to={this.state.value}>
          <button className='search-button'>Search</button>
        </Link>
      </div>
    );
  }
}

export default Search;