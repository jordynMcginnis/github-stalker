import React, { Component } from 'react';
import Contributions from './Contributions.js';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'Contributions'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e, selection) {
    this.setState(({render: selection}))
  }
  render() {
    return (
      <div className="Nav">
        <div className='Nav-bar'>
          <div onClick = {(e) => this.handleClick(e, 'Contributions')}>Contributions</div>
        </div>
        <div className='results'>
          {this.state.render === 'Contributions' ? <Contributions/> : null}
        </div>
        <div className='tweet'>
          <button> Download </button>
          <button>Tweet </button>
        </div>
      </div>
    );
  }
}

export default Nav;