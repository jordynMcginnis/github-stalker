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

  render() {

    return (
      <div className="Nav">
        <div className='Nav-bar'>
          <div>Contributions</div>
          <div>other</div>
          <div>Item</div>
        </div>
        <div className='results'>
          {this.state.render === 'Contributions' ? <Contributions/> : null}

        </div>
        <div className='tweet'>
          <button> download </button>
          <button>tweet </button>
        </div>
      </div>
    );
  }
}

export default Nav;