angular.module('listing').service('srvc', function($http){

  this.deletePic = function(){
    return $http({
      method: 'DELETE',
      url: '/api/deletePic'
    }).then((response) => {
      console.log('Service: ', response);
      return response.data
    })
  }

})
