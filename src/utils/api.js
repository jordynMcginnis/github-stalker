var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var sec = "YOUR_SECRET_ID";
var params = '?client_id' + id + "&client_secret=" + sec;




module.exports = {
  getProfile: function (username) {
    return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user){
      console.log(user.data);
      return user.data;
    });
  },
  getContributions: function (username) {
    return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user){
      console.log(user.data);
      return user.data;
    });
  }
};