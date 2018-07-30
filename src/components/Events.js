import React, { Component } from 'react';

class Events extends Component {
  render() {
    let order = this.props.events.sort((a, b) => a.created_at - b.created_at);
    let results = Object.keys(this.props.events.reduce((result, item) => {
      if(!result[item.type]){
        result[item.type] = 1;
      } else {
        result[item.type] = result[item.type] + 1;
      }
      return result;
    }, {}));
    let other = Object.values(this.props.events.reduce((result, item) => {
      if(!result[item.type]){
        result[item.type] = 1;
      } else {
        result[item.type] = result[item.type] + 1;
      }
      return result;
    }, {}));
    return (
      <div className='Events'>
        <p> Events from Users from  {order[order.length - 1].created_at.slice(5,7)}/{order[order.length - 1].created_at.slice(8,10)}/{order[order.length - 1].created_at.slice(0,4)} to  {order[0].created_at.slice(5,7)}/{order[0].created_at.slice(8,10)}/{order[0].created_at.slice(0,4)}</p>
        {results.map((item, index) => <div className= 'f-result' key={item}> {item} : {other[index]} </div> )}
      </div>
    );
  }
}

export default Events;