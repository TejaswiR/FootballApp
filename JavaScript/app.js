var angularApp = angular.module('Football-App',['ngResource','ngRoute'])

angularApp.config(function($routeProvider,$httpProvider) {
  $httpProvider.defaults.headers.get = { 'X-Auth-Token' : '5d2b18209c4f44c5a61fa93089c6cdfb'  }
  $routeProvider

  .when('/',
  {
    templateUrl: 'pages/main.html',
    contoller: 'MainController',
    cotrollerAs : 'vm'
  })

  .when ('/footballdetails/:uniqId',
  {
    templateUrl: 'pages/footballdetails.html',
    controller: 'DetailsController'
  })
});


angularApp.controller("MainController",['$resource',
function($resource){
   var vm=this;
   var football = $resource('http://api.football-data.org/v1/soccerseasons/');
   vm.footResponse = football.query();
   console.log(vm.footResponse);

}]);