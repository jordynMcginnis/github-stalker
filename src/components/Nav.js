import React, { Component } from 'react';
import Contributions from './Contributions.js';
class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div className='Nav-bar'>
          <div>Contributions</div>
          <div>other</div>
          <div>Item</div>
        </div>
        <div className='results'>
          <Contributions/>
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