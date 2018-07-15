import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import GoStar from 'react-icons/lib/go/star';
import {getProfile, getContributions, getFollowers, getEvents, getIssues, fetchFollowers} from './utils/api.js';
import Main from './components/Main.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      contributions: '',
      followers: [],
      events: '',
      issues: '',
      list: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    this.gatherAllFollowers = this.gatherAllFollowers.bind(this);
    this.callAgain = this.callAgain.bind(this);
    //this.handlePopular = this.handlePopular.bind(this);
  }
  handleClick({target}) {
    this.setState(function(){
      return {
        result: '',
      contributions: '',
      followers: [],
      events: '',
      issues: '',
      list: [],
      }
    });
    getProfile(target.value)
    .then(function(repos){
      this.setState(function(){
        return {
          result: repos
        }
      })
    }.bind(this))

    getContributions(target.value)
    .then(function(repos){
      this.setState(function(){
        return {
          contributions: repos
        }
      })
    }.bind(this))

   // fetchFollowers(target.value)
   //  .then(function(followers){
   //    var that = this;
   //    followers.map(function(person){
   //      that.handleFollower(person.login)
   //    });
   //    this.setState(function(){
   //      return {
   //        followers: followers
   //      }
   //    })
   //  }.bind(this))
    getEvents(target.value)
    .then(function(events){
      this.setState(function(){
        return {
          events: events,
          person: target.value
        }
      })
    }.bind(this))

    getIssues(target.value)
    .then(function(res){
      this.setState(function(){
        return {
          issues: res
        }
      })
    }.bind(this))
    this.callAgain(target.value, 1);
  }
  callAgain (value, num) {
    console.log('call again ran for', num)
    var that = this;

    fetchFollowers(value, num)
    .then(function(followers){
      console.log('stacked resposne', followers)
      var arr1 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last"') - 1];
        var arr2 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last",') - 1];
      if(arr1 || arr2){
        var arr;
        if(arr1 === undefined) {
          arr = arr2
        } else {
          arr = arr1;
        }
        console.log(followers.headers.link.split(' '))
        console.log('hhhhh', arr)
        var index = arr.indexOf('&page=');
        var finalPage = arr.toString().slice(index + 6, index + 8);
        if(num == finalPage){
          that.gatherAllFollowers();
          return;
        } else {
          console.log('num:' + num + ' final:' + finalPage)
 var final = this.state.followers.concat(followers.data);
      this.setState(function(){
        return {
          followers: final
        }
      })

          this.callAgain(value, num + 1);
        }
      } else {
        console.log('only 1 page...');
        console.log(that)
         var final = this.state.followers.concat(followers.data);
      this.setState(function(){
        return {
          followers: final
        }
      })
      this.gatherAllFollowers();
      }


    }.bind(this))
    }



  gatherAllFollowers() {
      var that = this;
      this.state.followers.map(function(person){
        that.handleFollower(person.login)
      });
  }
  handleFollower (person) {
    getProfile(person)
    .then(function(repos){
      var final = this.state.list.concat(repos);
      this.setState(function(){
        return {
          list: final
        }
      })
    }.bind(this))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search handleClick={this.handleClick}/>
        </header>
        {this.state.result !== ''
          ? <div className="App-intro">
              <Bio
                name= {this.state.result.name}
                userName={this.state.result.login}
                summary={this.state.result.bio}
                joined={this.state.result.created_at}
                location={this.state.result.location}
                repos={this.state.result.public_repos}
                photo={this.state.result.avatar_url}
              />
              <Nav contributions={this.state.contributions} followers={this.state.followers} list={this.state.list} events={this.state.events} fan={this.state.events} person={this.state.person} issues={this.state.issues}/>
            </div>
          : <Main/>
        }

      </div>
    );
  }
}

export default App;
