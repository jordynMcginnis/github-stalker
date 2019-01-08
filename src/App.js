import React, { Component } from 'react';
import './App.css';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import { getProfile, getContributions, getEvents, getIssues, fetchFollowers } from './utils/api.js';
import Main from './components/Main.js';
import Loading from './components/Loading.js';

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
    this.handleClick(this.props.match.params.id);
  }
  componentWillReceiveProps () {
    this.handleClick(this.props.match.params.id);
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
    var results = [];
    this.state.followers.forEach((person) => {
    getProfile(person.login)
      .then((repos) => {
        var final = results.concat(repos);
        if(final.length === this.state.result.followers){
          this.setState(() => {
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
    const { name, login, bio, created_at, location, public_repos, avatar_url } = this.state.result;
    const {contributions, followers, list, events, person, issues, render} = this.state;
    return (
        <div className="App">
          {render === 'result'
            ? <div className="App-intro">
                <Bio
                  name= {name}
                  userName={login}
                  summary={bio}
                  joined={created_at}
                  location={location}
                  repos={public_repos}
                  photo={avatar_url}
                />
                <Nav
                  contributions={contributions}
                  followers={followers}
                  list={list}
                  events={events}
                  fan={events}
                  person={person}
                  issues={issues}
                />
              </div>
              : null
          }
          {render === 'main'
            ? <Main/>
            : null
          }
          {render === 'loading'
            ? <Loading amount={this.state.result.followers}/>
            : null
          }
        </div>
    );
  }
}

export default App;
