import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import GoStar from 'react-icons/lib/go/star';
import {getProfile, getContributions, getFollowers, getEvents} from './utils/api.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      contributions: '',
      followers: '',
      events: ''
    }
    this.handleClick = this.handleClick.bind(this);
    //this.handlePopular = this.handlePopular.bind(this);
  }
  handleClick({target}) {
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

    // getFollowers(target.value)
    // .then(function(followers){
    //   console.log('this is the response', followers)
    //   this.setState(function(){
    //     return {
    //       followers: followers
    //     }
    //   })
    // }.bind(this))

    getEvents(target.value)
    .then(function(events){
      this.setState(function(){
        return {
          events: events
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
              />
              <Nav contributions={this.state.contributions} followers={this.state.contributions} events={this.state.events}/>
            </div>
          : null
        }
        <div className='author'>
          JORDYN MCGINNIS
          <div>
            <GoStar/> Star
          </div>
        </div>
      </div>
    );
  }
}

export default App;
