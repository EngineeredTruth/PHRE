angular.module('listing').controller('UserCtrl', function($scope, srvc){
  $scope.deletePic = function(){
    srvc.deletePic().then((response)=>{
      console.log('UserCtrl: ', response)
    })
  }
})
