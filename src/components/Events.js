import React, { Component } from 'react';
import {RadialBarChart, RadialBar, Legend} from 'recharts';

class Events extends Component {
  render() {
    const style = {
      top: 0,
      left: '50%',
      lineHeight: '24px',
      margin: '0 auto'
    };
    let key = {
      WatchEvent: 'watch',
      ForkEvent: 'fork',
    }
    let order = this.props.events.sort((a, b) => a.created_at - b.created_at);
    let results = Object.keys(this.props.events.reduce((result, {type}) => {
      if(!result[type]){
        result[type] = 1;
      } else {
        result[type] = result[type] + 1;
      }
      return result;
    }, {})).map((item) => {
      if(key[item]){
        item = key[item];
      } else {
        item = false;
      }
      return item;
    });
    //UP THERE

    let other = Object.values(this.props.events.reduce((result, {type}) => {
      if(!result[type]){
        result[type] = 1;
      } else {
        result[type] = result[type] + 1;
      }
      return result;
    }, {}));
    // let data = results.map((item, index) => {
    //   let obj = {};
    //   obj.name = item;
    //   obj.uv = other[index]

    //   return obj;
    // });
    let randomCol = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    let data = results.reduce((result,item, index) => {
      if(!!item){
        let obj = {};
        obj.name = item;
        obj.uv = other[index];
        obj.fill = randomCol();
        result.push(obj);
      }
      return result;
    },[]);
    console.log(data);
    return (
      <div className='Events'>
        {order.length === 0
          ? <p>No events</p>
          : <p> <span className='g-events'>Github Repository Events - </span> Events associated with your repositories from {order[order.length - 1].created_at.slice(5,7)}/{order[order.length - 1].created_at.slice(8,10)}/{order[order.length - 1].created_at.slice(0,4)} to  {order[0].created_at.slice(5,7)}/{order[0].created_at.slice(8,10)}/{order[0].created_at.slice(0,4)} from any github users.</p>
        }
        <div className='r'>
          <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data ={data} >
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv'/>
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
          </RadialBarChart>
        </div>
      </div>
    );
  }
}

export default Events;
