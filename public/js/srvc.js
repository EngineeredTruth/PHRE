app.factory('factory', function($http){
  return {
    checkUser: function(){
      return $http({
        method: 'GET',
        url: '/checkUser'
      }).then(function(response){
        return response.data;
      })
    }
  }
})
.service('srvc', function(){
  this.test = 'Matt'
})
