import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import { withRouter } from 'react-router-dom';

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
  handleSearch = () => {
    const { username } = this.state
    this.setState(({value : ''}));
    this.props.history.push(`/${username}`)
  }
  render() {
    return (
      <div className="search">
        <GoMarkGithub className='github-icon'/>
        <input
          className='search-input'
          placeholder='username'
          onChange={this.handleKey}
          value={this.state.value}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.handleSearch()
            }
          }}
        />
        <button
          className='search-button'
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(Search);