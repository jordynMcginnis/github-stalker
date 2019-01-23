import React, { Component } from 'react';
import GoAlert from 'react-icons/lib/go/alert';
import GoPerson from 'react-icons/lib/go/person';
import GoLocation from 'react-icons/lib/go/location';
import GoKeyboard from 'react-icons/lib/go/keyboard';

class Instructions extends Component {
  render() {
    return (
      <div className='instructions'>
        <h1>GITHUB STALKER</h1>
        <p>Enter your Github username to:</p>
        <ul className='options-i'>
          <li>
            <GoLocation className='icon'/>
            <span className='i-title'>View Followers Locations</span>
            View all of your followers locations within the USA on a Map.
          </li>
          <li>
            <GoPerson className='icon'/>
            <span className='i-title'>View Stalker</span>
            View who your github stalker is via a list of events a user has made in regards to your account.
          </li>
          <li>
            <GoKeyboard className='icon'/>
            <span className='i-title'> View Events</span>
            View all Github events that you or other users have made in regards to your account within a given time frame.
          </li>
          <li>
            <GoAlert className='icon'/>
            <span className='i-title'>View Issues</span>
            View history of all issues associated with account over a year timespan via a graph.
          </li>
        </ul>
      </div>
    )
  }
}

export default Instructions;