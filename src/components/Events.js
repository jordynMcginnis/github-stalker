import React, { Component } from 'react';

class Events extends Component {
  render() {
      var order = this.props.events.sort(function(a, b){
        return a.created_at - b.created_at
      });
      var results = Object.keys(this.props.events.reduce(function(result, item){
          if(!result[item.type]){
            result[item.type] = 1;
          } else {
            result[item.type] = result[item.type] + 1;
          }
          return result;
        }, {}));
        var other = Object.values(this.props.events.reduce(function(result, item){
          if(!result[item.type]){
            result[item.type] = 1;
          } else {
            result[item.type] = result[item.type] + 1;
          }
          return result;
        }, {}));
    return (
      <div className='Events'>
        <p> Events from Users from  {order[order.length - 1].created_at.slice(0,10)} to {order[0].created_at.slice(0,10)} </p>
        {results.map(function(item, index){
          return <div className= 'f-result'> {item} : {other[index]} </div>
        })}
        {console.log(order)}
      </div>
    );
  }
}

export default Events;