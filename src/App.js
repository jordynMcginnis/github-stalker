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
      followers: '',
      events: '',
      issues: '',
      list: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    //this.handlePopular = this.handlePopular.bind(this);
  }
  handleClick({target}) {
    this.setState(function(){
      return {
        result: '',
      contributions: '',
      followers: '',
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

    fetchFollowers(target.value)
    .then(function(followers){
      var that = this;
      followers.map(function(person){
        that.handleFollower(person.login)
      });
      this.setState(function(){
        return {
          followers: followers
        }
      })
    }.bind(this))

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
