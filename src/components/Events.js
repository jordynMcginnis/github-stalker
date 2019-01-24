import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import GoRepoForked from 'react-icons/lib/go/repo-forked';
import GoHeart from 'react-icons/lib/go/heart';
import GoTelescope from 'react-icons/lib/go/telescope';

class Events extends Component {
  render() {
    const style = {
      top: 0,
      left: '50%',
      lineHeight: '24px',
      margin: '0 auto'
    };
    let key = {
      WatchEvent: 'watched',
      ForkEvent: 'forked',
      StarredEvent: 'starred'
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
    let red = results.reduce((result,item, index) => {
      console.log('here', item)
      if(!!item){
        console.log('this ran')
        let obj = {};
        obj.name = item;
        obj.uv = other[index];
        obj.fill = randomCol();
        result.push(obj);
      }
      return result;
    },[]);
    console.log('before', red);
    let finalize = (data) => {
      let arr = ['watched', 'starred', 'forked'];
      for(var i = 2; i >= 0; i--){
        for(var j = 0; j < data.length; j++){
          console.log(data[j].name, arr[i]);
          if(data[j].name === arr[i]) {
            arr.splice(i, 1);
        }
      }

    }
      for(var k = 0; k < arr.length; k++){
            let obj = {};
            obj.name = arr[k];
            obj.uv = 1;
            obj.fill = randomCol();
            data.push(obj);
      }
      return data
    }
    let finalInfo = finalize(red);
    console.log('here', finalInfo);
    return (
      <div className='Events'>
        {order.length === 0
          ? <p>No events</p>
          : <p> <span className='g-events'>Github Repository Events - </span> Amount of your repositories that have been forked, watched, and cloned from {order[order.length - 1].created_at.slice(5,7)}/{order[order.length - 1].created_at.slice(8,10)}/{order[order.length - 1].created_at.slice(0,4)} to  {order[0].created_at.slice(5,7)}/{order[0].created_at.slice(8,10)}/{order[0].created_at.slice(0,4)} from any github user.</p>
        }
        <div className='r'>
          <BarChart width={450} height={300} data={finalInfo}>
           <Bar dataKey='uv' fill='#8884d8'/>
          </BarChart>
          <div className='e-items'>
          {finalInfo.map((item) => { return <div key={item.name} className='e-info'>{item.uv} of your repositories have been {item.name} by github users.</div>})}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
