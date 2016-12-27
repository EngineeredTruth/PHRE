app.controller('MainCtrl', function($scope, $location){

  $scope.checked = false;

  $scope.toggle = () => {
    $scope.checked = !$scope.checked;
  }

});
