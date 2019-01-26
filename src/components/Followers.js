import React, { Component } from 'react';
import USAMap from "react-usa-map";
import FollowerBio from './FollowerBio.js';

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

  stateConversion(lists) {
    const sheet = {
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

    const filtered = lists.filter(function (item) {
      return item.location !== null;
    });

    const map = filtered.map(function(item){
      return item.location;
    });

    let count = {};

    for(var i = 0; i < map.length; i++){
      let place = map[i];
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

    let sorted = [];

    for(key in count){
      let final = {};
      final.state = key;
      final.count = count[key];
      sorted.push(final)
    }

    const fullySorted = sorted.sort(function(a,b){
      return b.count - a.count;
    });

    const valueInString = fullySorted.length - 1;
    const num = parseFloat(valueInString);
    const top10 = Math.ceil(num - (num * .10));
    const top30 = Math.ceil(num - (num * .30));
    const top50 = Math.ceil(num - (num * .60));
    const top99 = Math.ceil(num - (num * .99));

    const guide = {
      most: '#006728',
      more: '#00a43c',
      middle: '#59d36e',
      low: '#bbec88',
      none: '#f7dbf0'
    }

    for(key in count){
      if(count[key] >= top10){
        count[key] = {fill: guide.most}
      }
      if (count[key] >= top30){
        count[key] = {fill: guide.more}
      }
      else if (count[key] >= top50){
        count[key]= {fill : guide.middle}
      }
      else if(count[key] >= top99){
        count[key]= {fill: guide.low}
      }
    }

    this.setState(function(){
      return {
        render: 'map',
        count : count
      }
    })
    return count;
  }

  render() {
    const link = `www.githubstalker.com/${this.props.link}`;
    const title = `Check out this app that shows my Github stalker,follower's locations, and events associated with my github account! ${link}`
    const person = this.props.list.sort(function(a, b){ return b.followers - a.followers})[0];
    const person2 = this.props.list.sort(function(a, b){ return b.followers - a.followers})[1];
    return (
      <div className='Followers'>
        <span className='stats'>Followers Stats - </span> Results based upon users who specify location within the USA.
        <div className= 'map-guide'>
            <div className='most'><div></div>More</div>
            <div className='more'></div>
            <div className='middle'></div>
            <div className='least'></div>
            <div className='none'>Less<div></div></div>
        </div>
        {this.state.render === 'map'
          ? <div className='map'>
              <USAMap customize={this.state.count}/>
            </div>
          : <div>placing all users on map now..</div>
        }
        <a className="twitter-share-button"
          href={`https://twitter.com/share?url=${link}&text=${title}`}
          data-size="large"
          data-url="www.google.com">
          <button className='tweet'> Tweet </button>
        </a>
        <div className='popularFollower'>
          <div className='most-pop'> <span className='stats'>Most popular followers - </span>Results are based upon which of your followers have the most followers.</div>
          <div className='top'>
            {person !== undefined
              ? <FollowerBio
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
            {person2 !== undefined
              ? <FollowerBio
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
      </div>
    );
  }
}

export default Followers;