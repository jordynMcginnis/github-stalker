import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App.js';


class Home extends Component {
  render() {
    return (
      <Router>
        <div className='home'>
          <Route path='/' component={App}/>
          <Route path='/:id' component={App}/>
        </div>
      </Router>
    )
  }
}

export default Home;