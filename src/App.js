import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';
import GoStar from 'react-icons/lib/go/star';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick({target}) {
     this.setState(({userName: target.value}))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search handleClick={this.handleClick}/>
        </header>
        {this.state.userName !== ''
          ? <div className="App-intro">
              <Bio
                name= 'Jordyn McGinnis'
                userName='jordynMcginnis'
                summary='Hi, my name is Jordyn and I love creating user interfaces that are responsive, clean, and easy to use!'
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
