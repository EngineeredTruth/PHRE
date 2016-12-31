var app = angular.module('app',['ui.router','ui.bootstrap',"pageslide-directive"])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('pre-sale', {
        url:'/pre-sale',
        templateUrl:'./views/pre-sale.html',
      })
      .state('secondary-market', {
        url: '/secdonary-market',
        templateUrl:'./views/secondary-market.html',
      })
      .state('rentals', {
        url:'/rentals',
        templateUrl:'./views/rentals.html',
      })
      .state('contact', {
        url:'/contact',
        templateUrl:'./views/contact.html'
      })
      .state('about', {
        url:'/about',
        templateUrl: './views/about.html'
      })
      .state('home', {
        url:'/',
        templateUrl: './views/home.html'
      })
      .state('create-listing', {
        url:'/create-listing',
        templateUrl: './views/create-listing.html',
        controller: 'AdminCtrl',
        resolve: {
          promiseObj: function(factory){
            return factory.checkUser();
          }
        }
      })

      $urlRouterProvider.otherwise('/');
})
