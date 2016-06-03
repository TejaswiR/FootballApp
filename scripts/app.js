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

  .when ('/teams/:uniqId',
  {
    templateUrl: 'pages/teams.html',
    controller: 'TeamController',
    controllerAs : 'tc'
  })

  .when ('/fixture',
  {
    templateUrl: 'pages/fixture.html',
    controller: 'FixContoller',
    controllerAs: 'fc'
  })
});


angularApp.controller("MainController",['$resource',
function($resource){
   var vm=this;
   var football = $resource('http://api.football-data.org/v1/soccerseasons/');
   vm.footResponse = football.query();
   console.log(vm.footResponse);

}])

angularApp.controller("TeamController",['$resource','$routeParams',
  function($resource,$routeParams){
    var vm=this;
    var id = $routeParams.uniqId;
    var team = $resource('http://api.football-data.org/v1/soccerseasons/'+id+'/leagueTable');
    vm.teamResponse = team.get();
    console.log(vm.teamResponse);
  }])


angularApp.controller("FixController",['$resource','$routeParams',
  function($resource,$routeParams){
    var vm=this;
    var id = $routeParams.uniqId;
    var fix = $resource('http://api.football-data.org/v1/soccerseasons/'+id+'/fixtures');
    vm.fixResponse = fix.get();
    console.log(vm.fixResponse);
  }]);

