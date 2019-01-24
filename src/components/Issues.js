import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Issues extends Component {
  render() {
    const result = this.props.issues.items.reduce((result, {created_at}) => {
      const date = created_at.slice(5, 7);
      if(result[date]){
        result[date] += 1;
      } else {
        result[date] = 1;
      }
      return result;
    },{});
    const data = [
      {name: 'January',  issues: result['01'], amt: 2400},
      {name: 'February', issues: result['02'], amt: 2210},
      {name: 'March', issues: result['03'], amt: 2290},
      {name: 'April', issues: result['04'], amt: 2000},
      {name: 'May', issues: result['05'], amt: 2181},
      {name: 'June', issues: result['06'], amt: 2500},
      {name: 'July', issues: result['07'], amt: 2100},
      {name: 'August', issues: result['08']},
      {name: 'September', issues: result['09']},
      {name: 'October', issues: result['10']},
      {name: 'November', issues: result['11']},
      {name: 'December', issues: result['12']},
    ];
    return (
      <div className='issues'>
        <span className='stats'> Github Issues - </span> Finds issues and pull requests that were either created by a certain user, assigned to that user, mention that user, or were commented on by that user.
        <BarChart width={800} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="issues" fill="#25c1a7" />
        </BarChart>
      </div>
    );
  }
}

export default Issues;