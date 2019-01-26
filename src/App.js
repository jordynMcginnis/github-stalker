import React, { Component } from 'react';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import { getProfile, getContributions, getEvents, getIssues, fetchFollowers } from './utils/api.js';
import Main from './components/Main.js';
import Loading from './components/Loading.js';
import GoAlert from 'react-icons/lib/go/alert';

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
  }

  componentDidMount () {
    this.handleClick(this.props.match.params.id);
  }

  componentWillReceiveProps (newProps) {
    this.handleClick(newProps.match.params.id);
  }

  handleClick = (target) => {
    this.setState(() => ({
      result: '',
      contributions: '',
      followers: [],
      events: '',
      issues: '',
      list: [],
      render: 'loading'
    }));

    getProfile(target)
      .then((repos) => {
        if(repos === 404){
          this.setState(() => ({render: 'noUserName'}));
        }
        else if (repos === 403) {
          this.setState(() => ({render: 'limit'}));
        }
        else if(typeof(repos) === 'number') {
          this.setState(() => ({render: 'notFound'}));
        } else {
          this.setState(() => ({result: repos}))
        }
      })

    getContributions(target)
      .then((repos) => {
        this.setState(() => ({contributions: repos}))
      })

    getEvents(target)
      .then((events) => {
        this.setState(() => ({events: events,person: target}))
      })

    getIssues(target)
      .then(res => {
        this.setState(() =>({issues: res}))
      })

    this.callAgain(target, 1);
  }

  callAgain = (value, num, results = []) => {
    fetchFollowers(value, num)
      .then((followers) => {
        let arr1 = null;
        let arr2 = null;
        let final = null;
        if(followers.headers.link){
          arr1 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last"') - 1];
          arr2 = followers.headers.link.split(' ')[followers.headers.link.split(' ').indexOf('rel="last",') - 1];
        }
        if(arr1 || arr2){
          let arr = null;
          if(arr1 === undefined) {
            arr = arr2
          } else {
            arr = arr1;
          }
          const index = arr.indexOf('&page=');
          const finalPage = arr.toString().slice(index + 6, index + 8);

          if(num >= finalPage){
            return;
          } else {
            final = results.concat(followers.data);
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
        })
  }

  handleFollower = () =>  {
    let results = [];
    this.state.followers.forEach((person) => {
    getProfile(person.login)
      .then((repos) => {
        const final = results.concat(repos);
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
    const { contributions, followers, list, events, person, issues, render, result } = this.state;
    const { name, login, bio, created_at, location, public_repos, avatar_url } = result;

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
                  link={this.props.match.params.id}
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
          {render === 'notFound'
            ? <h1 className='incorrect'><GoAlert className='alert'/>Oops something went wrong...</h1>
            : null
          }
           {render === 'limit'
            ? <h1 className='incorrect'><GoAlert className='alert'/>Api limit hit please come back in an hour or so...</h1>
            : null
          }
          {render === 'noUserName'
            ? <h1 className='incorrect'><GoAlert className='alert'/>Incorrect username</h1>
            : null
          }
        </div>
    );
  }
}

export default App;