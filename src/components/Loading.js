import React, { Component } from 'react';


class Loading extends Component {
  render() {
    return (
      <div className='Loading'>
        <h1> LOADING....</h1>
        <h6> Gathering All {this.props.amount} Followers Data... </h6>
      </div>
    );
  }
}

export default Loading;