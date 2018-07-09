import React, { Component } from 'react';

class Fan extends Component {

  render() {
    var main = this.props.person;
    var result = this.props.events.reduce(function(result, item){
          if(!result[item.actor.login] && item.repo.name.indexOf(main) > -1){
            result[item.actor.login] = 1;
          } else if(item.repo.name.indexOf(main) > -1){
            result[item.actor.login] = result[item.actor.login] + 1;
          }
          return result;
        }, {});
    var name = '';
    var count = 0;
    for(var key in result){
      if(result[key] > count){
        count = result[key];
        name = key;
      }
    };
    var personEvent = this.props.events.filter(function(item){
      return item.actor.login === name;
    });


    return (
      <div className='Contributions'>
        <p className='fan-name'> {name} </p>
        <div className='f-result guide'> <span> Event </span> <span> Repo</span> <span> Date</span> </div>
        <div className='fan-results'>
          {personEvent.map(function(item){
            return <div className='f-result'> <span> {item.type}: </span>  {item.repo.name}<span> {item.created_at.slice(0,10)}</span> </div>
          })}
        </div>
      </div>
    );
  }
}

export default Fan;