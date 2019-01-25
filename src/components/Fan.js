import React, { Component } from 'react';

class Fan extends Component {
  render() {
    const props = this.props;
    const main = props.person;

    const result = props.events.reduce((result, {actor, repo}) => {
      if(!result[actor.login] && repo.name.indexOf(main) > -1){
        result[actor.login] = 1;
      } else if(repo.name.indexOf(main) > -1){
        result[actor.login] = result[actor.login] + 1;
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
    const personEvent = props.events.filter(({actor}) => actor.login === name);
    let background = null;

    if(personEvent.length > 0){
      background = personEvent[0].actor.avatar_url;
    } else {
      background = null;
    }

    personEvent.map((item) => {
      if(item.type === 'WatchEvent'){
        item.type = 'watched'
      }
      return item;
    });
    return (
      <div className='Contributions'>
        <div className='fan-info'> <span className='stats'> Github Stalker - </span>  Results based on activity from Github users associated with account within the past week.</div>
        <div className='fan-all'>
          <span className='fan-information'>
            <div className='fan-photo' style={{backgroundImage: "url(" + background + ")"}}></div>
            <p className='fan-name'>{name === '' ? 'No Stalker' : name}</p>
          </span>
          <div className='fan-results'>
            <span> ACTIVITY: </span>
            {personEvent.map(({repo, created_at, type}) => <div className='f-result' key={repo.name}> {repo.name} repository was {type} on {created_at.slice(5,7)}/{created_at.slice(8,10)}/{created_at.slice(0,4)} by {name}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Fan;