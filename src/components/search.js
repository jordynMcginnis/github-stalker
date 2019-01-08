import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleKey = this.handleKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleKey ({target}) {
    const value = target.value;
    this.setState(({value}));
  }
  handleSubmit () {
    console.log('link changed')
    //this.props.handleClick(this.state.value);
  }
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input className='search-input' placeholder='Enter username... like jordynMcginnis' onChange={this.handleKey} onKeyPress={(e) => e.key === 'Enter' ? this.handleSubmit() : null}/>
        <Link to={this.state.value}>
          <button onClick={this.handleSubmit}>Search</button>
        </Link>
      </div>
    );
  }
}

export default Search;