import React, { Component } from 'react';
import USAMap from "react-usa-map";

class Followers extends Component {


  statesCustomConfig = (list) => {
    var filtered = list.filter(function (item) {
      return item.location !== null;
    })
    var something = filtered.reduce(function(result, item){
      if(item !== null & result[item.location.split(' ')[1]]){
        result[item.location.split(' ')[1]] += 1;
      } else if(item !== null){
        result[item.location.split(' ')[1]] = 1;
      }
      return result;
    },{});
    const guide = {
      more: '#f7dbf0',
      middle: '#ccccff',
      low: '#e5e5ff',
      none: '#f7dbf0'
    }

    var other = {};
    console.log('here', something)
    for(var key in something){
      var color = guide.none;
      if(something[key] >= 1){
        color = guide.low;
      }
      if (something[key] > 20){
        color = guide.middle;
      }
      if (something[key] > 60){
        console.log('is more')
        color = guide.more;
      }
      if(key === 'Utah'){
        other.UT = { fill: color}
      }
      if(key === 'California'){
        other.CA = { fill: color}
      }
      if(key === 'New Jersey'){
        other.NJ = { fill: color}
      }
      if(key === 'New York' || key === 'NY'){
        other.NY = { fill: color}
      }
      if(key === 'Florida'){
        other.FL = { fill: color}
      }
      if(key === 'Washington'){
        other.WA = { fill: color}
      }
      if(key === 'Texas'){
        other.TX = { fill: color}
      }
      if(key === 'Colorado'){
        other.CO = { fill: color}
      }
      if(key === 'Kansas'){
        other.KS = { fill: color}
      }
      if(key === 'Alabama'){
         other.AL = { fill: color}
      }
      if(key === 'Tennesse'){
        other.TN = { fill: color}
      }
      if(key === 'Oregon'){
        other.OR = { fill: color}
      }
      if(key === 'Nevada'){
        other.NV = { fill: color}
      }
      if(key === 'Alaska'){
        other.AK = { fill: color}
      }
      if(key === 'Tennesse'){
        other.TN = { fill: color}
      }
    }
    console.log(other)
    return other;
    // {
    //   "NJ": {
    //     fill: "navy",
    //     clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
    //   },
    //   "NY": {
    //     fill: "#CC0000"
    //   }
    // };
  };
  render() {

    return (
      <div className='Followers'>
        Followers Stats
        <div className='map'>
          <USAMap customize={this.statesCustomConfig(this.props.list)} />
        </div>

      </div>
    );
  }
}

export default Followers;