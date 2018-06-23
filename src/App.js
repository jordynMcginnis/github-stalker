import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import GoStar from 'react-icons/lib/go/star';
import {getProfile} from './utils/api.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }
    this.handleClick = this.handleClick.bind(this);
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
              <Nav/>
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
