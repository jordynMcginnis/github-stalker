import React, { Component } from 'react';
import './App.css';
import Search from './components/search.js';
import Bio from './components/Bio.js';
import Nav from './components/Nav.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search/>
        </header>
        <div className="App-intro">
          <Bio
            name= 'Jordyn McGinnis'
            userName='jordynMcginnis'
            summary='Hi, my name is Jordyn and I love creating user interfaces that are responsive, clean, and easy to use!'
          />
          <Nav/>

        </div>
      </div>
    );
  }
}

export default App;
