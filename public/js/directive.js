app.directive('navBar', () => {
  return {
    restrict: 'E',
    templateUrl: '../templates/nav-bar.html',
    controller: 'NavCtrl'
  }
}).directive('navBarBlack', () => {
  return {
    restrict: 'E',
    templateUrl: '../templates/nav-bar-black.html',
  }
})
