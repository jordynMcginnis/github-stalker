import React, { Component } from 'react';
import USAMap from "react-usa-map";

class Followers extends Component {


  statesCustomConfig = (list) => {
    var total = 0;
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
      middle: '#adc4e5',
      low: '#e5e5ff',
      none: '#f7dbf0'
    }
    // var poop = {'NY': 1, 'UT': 60};
    // something = poop;
    var other = {};
    console.log('here', something)
    for(var key in something){
      var color = guide.none;
      if (something[key] >= 3){
        console.log('is more')
        color = guide.more;
      }
      else if (something[key] >= 2){
        color = guide.middle;
      }
      else if(something[key] >= 1){
        console.log('color ran')
        color = guide.low;
      }


      if(key === 'Utah' || key === 'UT'){

        other.UT = { fill: color}
      }
      if(key === 'California' || key === 'CA' || key === 'Francisco'|| key === 'diego'){
        color += 1;
        other.CA = { fill: color}
      }
      if(key === 'New Jersey'){
        other.NJ = { fill: color}
      }
      if(key === 'New York' || key === 'NY'){
        other.NY = { fill: color}
      }
      if(key === 'Florida' || key === 'FL' ){
        other.FL = { fill: color}
      }
      if(key === 'Washington' || key === 'WA'){
        other.WA = { fill: color}
      }
      if(key === 'Texas' || key === 'TX'){
        other.TX = { fill: color}
      }
      if(key === 'Colorado' || key === 'CO'){
        other.CO = { fill: color}
      }
      if(key === 'Kansas' || key === 'KS'){
        other.KS = { fill: color}
      }
      if(key === 'Alabama' || key === 'AL'){
         other.AL = { fill: color}
      }
      if(key === 'Tennesse' || key === 'TN'){
        other.TN = { fill: color}
      }
      if(key === 'Oregon'|| key === 'OR'){
        other.OR = { fill: color}
      }
      if(key === 'Nevada' || key === 'NV'){
        other.NV = { fill: color}
      }
      if(key === 'Alaska' || key === 'AK'){
        other.AK = { fill: color}
      }
      if(key === 'Maine' || key === 'MN'){
        other.MN = { fill: color}
      } else {
        total += 1;
      }
    }
    console.log('other', other)
    console.log('outside of united states: ', total);
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

  stateConversion = (lists) => {
    var sheet = {
      "AL": "Alabama",
      "AK": "Alaska",
      "AS": "American Samoa",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "DC": "District Of Columbia",
      "FM": "Federated States Of Micronesia",
      "FL": "Florida",
      "GA": "Georgia",
      "GU": "Guam",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MH": "Marshall Islands",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "MP": "Northern Mariana Islands",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PW": "Palau",
      "PA": "Pennsylvania",
      "PR": "Puerto Rico",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VI": "Virgin Islands",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
    };
    var filtered = lists.filter(function (item) {
      return item.location !== null;
    });
    var map = filtered.map(function(item){
      return item.location;
    });
    console.log('arr', map)
    var count = {

    }
    for(var i = 0; i < map.length; i++){
      var place = map[i];
      //console.log(place)
      for(var key in sheet){
        //console.log(sheet[key])
        console.log(place.split(' ').indexOf(sheet[key]))
        if(place.split(' ').indexOf(key) > 0 || place.split(' ').indexOf(sheet[key]) > 0){
          //console.log(true)
          if(count[key]){
            count[key] += 1;
          } else {
            count[key] = 1;
          }
        }
      }
    }
    console.log('count final:', count);
    const guide = {
      more: '#f7dbf0',
      middle: '#adc4e5',
      low: '#e5e5ff',
      none: '#f7dbf0'
    }

    for(var key in count){
      var color = guide.none;
      if (count[key] >= 3){
        count[key] = { fill: guide.more}
      }
      else if (count[key] >= 2){
        count[key]= { fill : guide.middle}
      }
      else if(count[key] >= 1){
        count[key]= { fill: guide.low}
      }

  }
  return count;
}
  render() {
    var item = this.props.list[0];
    return (
      <div className='Followers'>
        Followers Stats
        <div className='map'>
          <USAMap customize={this.stateConversion(this.props.list)} />
        </div>
        <div className='popularFollower'>
          <div> Most popular follower: {this.props.list.sort(function(a, b){ return b.followers - a.followers})[0].name}</div>
          <div> Results based on github user who has the most followers that is following user.</div>
        </div>
      </div>
    );
  }
}

export default Followers;