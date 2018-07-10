var axios = require('axios');
var id = 'd96cbb4c107cc58c45e2';
var sec = "9d9d4df620267d122ce90131abfc34dd5f77646f";
var params = '?client_id' + id + "&client_secret=" + sec;
var header =  { 'headers': { 'Accept': 'application/vnd.github.cloak-preview' } }



module.exports = {
  getProfile: function (username) {
    return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user){
      console.log('profile', user.data);
      return user.data;
    });
  },
  getContributions: function (username) {
    return axios.get('https://api.github.com/search/commits?q=repo:octocat/Spoon-Knife+css', header + params)
    .then(function(user){
      console.log('here', user.data);
      return user.data
    });
  },
  getFollowers: function (username) {
    var count = -1;
    var top5 = [];
    return axios.get('https://api.github.com/users/'+ username + '/followers', header + params)
    .then(function(users){
      count = users.data.length;
      for(var i = 0; i < users.data.length; i++){
        return axios.get('https://api.github.com/users/' + users.data[i].login + params)
         .then(function(user){
          top5.push(user.data);
         console.log(user.data);
         if(top5.length === count){
          return top5;
         }
        });
      }
      while(top5.length === 0){
        return 'hi'
      }
    });
  },
  getEvents: function (username) {
    return axios.get('https://api.github.com/users/' + username + '/received_events/public?per_page=100', header + params)
    .then(function(user){
      //console.log('here', user.data);
      return user.data
    });
  },

};