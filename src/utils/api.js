var axios = require('axios');
var id = 'd96cbb4c107cc58c45e2';
var sec = "9d9d4df620267d122ce90131abfc34dd5f77646f";
var params = 'client_id=' + id + "&client_secret=" + sec;
var header =  { 'headers': { 'Accept': 'application/vnd.github.cloak-preview' } }



module.exports = {
  getProfile: (username) => {
    return axios.get('https://api.github.com/users/' + username + '?' + params)
    .then(function(user){
      return user.data;
    })
    .catch(error => {
      return false;
    })
  },
  getContributions: (username) => {
    return axios.get('https://api.github.com/search/commits?q=repo:octocat/Spoon-Knife+css'+ params, header )
    .then(function(user){
      return user.data
    });
  },
  fetchFollowers: (username, num) => {
    return axios.get('https://api.github.com/users/' + username + '/followers?per_page=100&page='+num +'&' + params, header )
    .then(function(user){
      return user
    });
  },
  getEvents: (username) => {
    return axios.get('https://api.github.com/users/' + username + '/received_events/public?' + params, header )
    .then(function(user){
      return user.data
    });
  },
    getIssues: (username) => {
    return axios.get('https://api.github.com/search/issues?q=involves:' + username +' created:>=2018-01-01', header + '?' + params)
    .then(function(user){
      return user.data
    });
  },
};