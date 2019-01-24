import React, { Component } from 'react';

const Day = (props) => (
  <div className='status-light-green'></div>
)

const Month = () => (
  <Day status='status-light-green'/>
)

const Year = (props) => (
  <div>
    this is a year {props.yearf}
    <Month className= 'month'/>
  </div>
)

class Contributions extends Component {
  render() {
    return (
      <div className='Contributions'>
        Lifetime Contributions: {this.props.contributions.total_count}
        <Year yearf="2018"/>
      </div>
    );
  }
}

export default Contributions;