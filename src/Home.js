import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App.js';
import Search from './components/search.js';

class Home extends Component {
  handleClick = (target) => {
    //console.log(target)
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <header className="App-header">
            <Search handleClick={this.handleClick}/>
          </header>
          <Route path='/' component={App}/>
          <Route path='/:id' component={App}/>
        </div>
      </Router>
    )
  }
}

export default Home;