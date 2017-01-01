
app.controller('AdminCtrl', function ($scope, promiseObj) {
  $scope.hi = "Matt";

  $scope.admin = promiseObj.admin

  console.log("promiseObj: ", promiseObj)
});
