import React, { Component } from 'react';
import { RotateSpinner } from "react-spinners-kit";

class Loading extends Component {
  render() {
    return (
      <div className='Loading'>
        <RotateSpinner
          size={40}
          color="#00682c"
          loading={true}
        />
        <h2>LOADING....</h2>
        <h6>Gathering All {this.props.amount} Followers Data</h6>
        {this.props.amount > 200
          ? <h6>May take a minute...</h6>
          : null
        }
      </div>
    );
  }
}

export default Loading;