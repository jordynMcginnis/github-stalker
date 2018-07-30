import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

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
    let value = target.value;
    this.setState(({value}));
  }
  handleSubmit () {
    this.props.handleClick(this.state.value)
  }
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input className='search-input' placeholder='Enter username... like jordynMcginnis' onChange={this.handleKey} onKeyPress={(e) => e.key === 'Enter' ? this.handleSubmit() : null}/>
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default Search;