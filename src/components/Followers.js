import React, { Component } from 'react';
import USAMap from "react-usa-map";

class Followers extends Component {


  statesCustomConfig = () => {
    const guide = {
      more: '#b2b2ff',
      middle: '#ccccff',
      low: '#e5e5ff',
      none: '#ffffff'
    }
    return {
      "NJ": {
        fill: "navy",
        clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
      },
      "NY": {
        fill: "#CC0000"
      }
    };
  };
  render() {

    return (
      <div className='Followers'>
        Followers Stats
        <div className='map'>
          <USAMap customize={this.statesCustomConfig()} width='90'/>
        </div>

      </div>
    );
  }
}

export default Followers;