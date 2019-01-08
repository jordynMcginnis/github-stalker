import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import { getProfile, getContributions, getEvents, getIssues, fetchFollowers } from './utils/api.js';
import Main from './components/Main.js';
import Loading from './components/Loading.js';
import { Link } from 'react-router-dom';

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
      render: 'main'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    this.callAgain = this.callAgain.bind(this);
  }
  componentDidMount () {
    //console.log(props.params.id);
  }
  handleClick(target) {
    this.setState(function(){
      return {
      result: '',
      contributions: '',
      followers: [],
      events: '',
      issues: '',
      list: [],
      render: 'loading'
      }
    });

    getProfile(target)
    .then(function(repos){
      this.setState(function(){
        return {
          result: repos
        }
      })
    }.bind(this))

    getContributions(target)
    .then(function(repos){
      this.setState(function(){
        return {
          contributions: repos
        }
      })
    }.bind(this))

    getEvents(target)
    .then(function(events){
      this.setState(function(){
        return {
          events: events,
          person: target
        }
      })
    }.bind(this))

    getIssues(target)
    .then(function(res){
      this.setState(function(){
        return {
          issues: res
        }
      })
    }.bind(this))

    this.callAgain(target, 1);
  }

  callAgain (value, num, results = []) {
    fetchFollowers(value, num)
    .then(function(followers){
      if(followers.headers.link){
        var arr1 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last"') - 1];
        var arr2 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last",') - 1];
      }

      if(arr1 || arr2){
        var arr;
        if(arr1 === undefined) {
          arr = arr2
        } else {
          arr = arr1;
        }
        var index = arr.indexOf('&page=');
        var finalPage = arr.toString().slice(index + 6, index + 8);

        if(num >= Number.parseInt(finalPage)){
          return;
        } else {
          var final = results.concat(followers.data);
          this.callAgain(value, num + 1, final);
          }
      } else {
        final = results.concat(followers.data);
        this.setState(function(){
          return {
            followers: final
          }
        })
        this.handleFollower();
        return;
        }
      }.bind(this))
    }

  handleFollower () {
    var that = this;
    var results = [];
    this.state.followers.forEach(function(person){
    getProfile(person.login)
      .then(function(repos){
        var final = results.concat(repos);
        if(final.length === that.state.result.followers){
          that.setState(function() {
            return {
              list: final,
              render: 'result'
            }
          })

        } else {
          results = final;
        }
      })
    })
  }

  render() {
    return (
        <div className="App">

          {this.state.render === 'result'
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
              : null
          }
          {this.state.render === 'main'
            ? <Main/>
            : null
          }
          {this.state.render === 'loading'
            ? <Loading amount={this.state.result.followers}/>
            : null
          }
        </div>
    );
  }
}

export default App;
