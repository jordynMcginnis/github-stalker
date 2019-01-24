import React, { Component } from 'react';
import { BarChart, Bar } from 'recharts';

class Events extends Component {
  render() {
    const actionsKey = {
      WatchEvent: 'watched',
      ForkEvent: 'forked',
      StarredEvent: 'starred'
    }
    const order = this.props.events.sort((a, b) => a.created_at - b.created_at);

    const hasKey = (val) => {
      for(var key in actionsKey){
        if(actionsKey[key] == val){
          return true
        }
      }
      return false
    }

    let repositoryResults = Object.keys(this.props.events.reduce((result, {type}) => {
      if(!result[type]){
        result[type] = 1;
      } else {
        result[type] = result[type] + 1;
      }
      return result;
    }, {})).map((item) => {
      if(actionsKey[item]){
        item = actionsKey[item];
      } else if (hasKey(item) === true) {
        item = item;
      } else {
        item = false;
      }
      return item;
    });

    console.log('reduce result:', repositoryResults)

    const allEvents = Object.values(this.props.events.reduce((result, {type}) => {
      if(!result[type]){
        result[type] = 1;
      } else {
        result[type] = result[type] + 1;
      }
      return result;
    }, {}));

    const randomColorGenerator = () => {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    let mergeResults = repositoryResults.reduce((result,item, index) => {
      if(!!item){
        let obj = {};
        obj.name = item;
        obj.uv = allEvents[index];
        obj.fill = randomColorGenerator();
        result.push(obj);
      }
      return result;
    },[]);

    let finalize = (data) => {
      let arr = ['watched', 'starred', 'forked'];
      for(let i = 2; i >= 0; i--){
        for(let j = 0; j < data.length; j++){
          if(data[j].name === arr[i]) {
            arr.splice(i, 1);
          }
        }
      }
      for(let k = 0; k < arr.length; k++){
        let obj = {};
        obj.name = arr[k];
        obj.uv = 1;
        obj.fill = randomColorGenerator();
        data.push(obj);
      }
      return data
    }
    const finalInfo = finalize(mergeResults);

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