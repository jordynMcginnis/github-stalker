import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import GoStar from 'react-icons/lib/go/star';
import {getProfile, getContributions, getFollowers, getEvents, getIssues, fetchFollowers} from './utils/api.js';
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
    //this.gatherAllFollowers = this.gatherAllFollowers.bind(this);
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
      render: 'loading'
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

  callAgain (value, num, results) {
    var that = this;
    var results = results || [];
    fetchFollowers(value, num)
    .then(function(followers){
      if(followers.headers.link){
        var arr1 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last"') - 1];
        var arr2 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last",') - 1];
      } else {
        console.log('booo')

      }

      if(arr1 || arr2){
        //console.log('exists')
        var arr;
        if(arr1 === undefined) {
          arr = arr2
        } else {
          arr = arr1;
        }
        var index = arr.indexOf('&page=');
        var finalPage = arr.toString().slice(index + 6, index + 8);
        console.log('num', num);
        console.log('finalp', finalPage);
        if(num >= Number.parseInt(finalPage)){
          console.log('weird thing runns here')
          console.log(results.length)
          //that.gatherAllFollowers();

          return;
        } else {
            var final = results.concat(followers.data);
            //results = final;
            //console.log('got here')

            this.callAgain(value, num + 1, final);
          }

      } else {
              var final = results.concat(followers.data);
              this.setState(function(){
                return {
                  followers: final
                }
              })
              console.log('SHOULD ONLY RUN ONCE GIRL')
              this.handleFollower();//this should only be called once ever....
              return;
              }


      }.bind(this))
    }


  handleFollower () {
    var that = this;
    var results = [];
    this.state.followers.map(function(person){
    getProfile(person.login)
      .then(function(repos){
        var final = results.concat(repos);
        if(final.length === that.state.result.followers){
          that.setState(function() {
            return {
              list: final,
              render: 'result'
            }
          }.bind(that))

        } else {
          results = final;
        }
      })
    })

    // this.state.followers.map(function(person){
    // getProfile(person.login)
    //   .then(function(repos){
    //     var results = results.concat(repos);
    //   })
    // })
    // console.log('results', results)
    //  that.setState(function() {
    //         return {
    //           list: results,
    //           render: 'result'
    //         }
    //       }.bind(that))

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search handleClick={this.handleClick}/>
        </header>
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
          ? <Loading/>
          : null
        }
      </div>
    );
  }
}

export default App;
