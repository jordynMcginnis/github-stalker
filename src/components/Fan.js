import React, { Component } from 'react';

class Fan extends Component {
  render() {
    let main = this.props.person;
    const result = this.props.events.reduce((result, item) => {
      if(!result[item.actor.login] && item.repo.name.indexOf(main) > -1){
        result[item.actor.login] = 1;
      } else if(item.repo.name.indexOf(main) > -1){
        result[item.actor.login] = result[item.actor.login] + 1;
      }
      return result;
    }, {});
    let name = '';
    let count = 0;
    for(let key in result){
      if(result[key] > count){
        count = result[key];
        name = key;
      }
    };
    let personEvent = this.props.events.filter((item) => item.actor.login === name);
    return (
      <div className='Contributions'>
        <p className='fan-name'>  {name === '' ? 'No Stalker' : name} </p>
        <div className='fan-info'> <span className='stats'> Github Stalker - </span>  Results based on recent activity from users associated with {this.props.person}'s account.</div>
        <div className='fan-results'>
          {personEvent.map((item) => <div className='f-result' key={item.repo.name}> <span>{item.type}:</span>{item.repo.name}<span>{item.created_at.slice(5,7)}/{item.created_at.slice(8,10)}/{item.created_at.slice(0,4)}</span></div>)}
        </div>
      </div>
    );
  }
}
export default Fan;