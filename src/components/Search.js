import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import { withRouter } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  handleKey = ({target}) => {
    const username = target.value;
    this.setState(({username}));
  }
  handleSearch = () => {
    const { username } = this.state
    this.setState(({username : ''}));
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
          value={this.state.username}
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
