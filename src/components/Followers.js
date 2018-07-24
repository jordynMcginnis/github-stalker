import React, { Component } from 'react';
import USAMap from "react-usa-map";
import Bio from './Bio.js';
class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'load'
    }
    this.stateConversion = this.stateConversion.bind(this);
  }
  componentDidMount() {
    this.stateConversion(this.props.list);
  }

  stateConversion = (lists) => {
    console.log('this ran bitch')
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
    var count = {};
    for(var i = 0; i < map.length; i++){
      var place = map[i];
      for(var key in sheet){
        if(place.split(' ').indexOf(key) > 0 || place.split(' ').indexOf(sheet[key]) > 0){
          if(count[key]){
            count[key] += 1;
          } else {
            count[key] = 1;
          }
        }
      }
    }
    var sorted = [];
    for(var key in count){
      var final = {};
      final.state = key;
      final.count = count[key];
      sorted.push(final)
    }
    var fullySorted = sorted.sort(function(a,b){
      return b.count - a.count;
    });
    var valueInString = fullySorted.length - 1;
    var num = parseFloat(valueInString);
    var top10 = Math.ceil(num - (num * .10));
    var top30 = Math.ceil(num - (num * .30));
    var top50 = Math.ceil(num - (num * .60));
    var top99 = Math.ceil(num - (num * .99));
    console.log('top30', top30)
    const guide = {
      most: '#006728',
      more: '#00a43c',
      middle: '#59d36e',
      low: '#bbec88',
      none: '#f7dbf0'
    }
    var highest = fullySorted[0]['count'];
    var middle = fullySorted[Math.round(fullySorted.length/2)]['count'];
    var low = fullySorted[fullySorted.length - 1]['count'];

    for(var key in count){
      var color = guide.none;
      if(count[key] >= top10){
        count[key] = {fill: guide.most}
      }
      if (count[key] >= top30){
        count[key] = { fill: guide.more}
      }
      else if (count[key] >= top50){
        count[key]= { fill : guide.middle}
      }
      else if(count[key] >= top99){
        count[key]= { fill: guide.low}
      }
    }
    console.log('right here', count)
    this.setState(function(){
      return {
        render: 'map',
        count : count
      }
    })
  return count;
}
  render() {
    var namee = this.props.person;
    var noPerson = this.props.list.filter(function(item){return item.login !== namee})
    var person = this.props.list.sort(function(a, b){ return b.followers - a.followers})[0];
    var person2 = this.props.list.sort(function(a, b){ return b.followers - a.followers})[1];
    return (
      <div className='Followers'>
        <span className='stats'>Followers Stats - </span> Results based upon users who specify location within the USA.
        <div className= 'map-guide'>
            <div className='most'> <div></div>More</div>
            <div className='more'> </div>
            <div className='middle'> </div>
            <div className='least'> </div>
            <div className='none'> Less <div></div></div>
          </div>
          {this.state.render === 'map'
            ?  <div className='map'>
          <USAMap customize={this.state.count} width='100%'/>
         </div>
         : <div>placing all users on map now.. </div>
          }

        <a class="twitter-share-button"
        //href="https://twitter.com/intent/tweet?text=Check%20out%20who%20is%20stalking%20you" + "&hashtags=github-stalker&via=jordynbmcginnis"
          href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20map%20that%20shows%20your%20github%20users%20locations!&hashtags=github-stalker&via=jordynbmcginnis"
          data-size="large">
          <button> Tweet </button>
        </a>

        <div className='popularFollower'>
          <div className='most-pop'> <span className='stats'>Most popular followers - </span>Results based on github user who has the most followers that is following user. </div>
          {person !== undefined ?
          <Bio
                name= {person.name}
                userName={person.login}
                summary={person.bio}
                joined={person.created_at}
                location={person.location}
                repos={person.public_repos}
                photo={person.avatar_url}
              />
              : null
            }
            {person2 !== undefined ?
            <Bio
                name= {person2.name}
                userName={person2.login}
                summary={person2.bio}
                joined={person2.created_at}
                location={person2.location}
                repos={person2.public_repos}
                photo={person2.avatar_url}
              />
              : null
            }
        </div>
      </div>
    );
  }
}

export default Followers;