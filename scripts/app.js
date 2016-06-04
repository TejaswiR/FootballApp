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

  .when ('/players/:uniqId',
  {
    templateUrl: 'pages/players.html',
    controller: 'PlayerController',
    controllerAs: 'pc'
  })
});


angularApp.controller("MainController",['$resource',
function($resource){
   var vm=this;
   var football = $resource('http://api.football-data.org/v1/soccerseasons/');
   vm.footResponse = football.query();
   console.log(vm.footResponse);

}]);

angularApp.controller("TeamController",['$resource','$routeParams','FootballService',
  function($resource,$routeParams,FootballService){
    var vm=this;
    var id = $routeParams.uniqId;
    var teams = $resource('http://api.football-data.org/v1/soccerseasons/'+id+'/leagueTable');
    vm.teamResponse = teams.get();
    console.log(vm.teamResponse);

  
    var vm = this;
    var id = $routeParams.uniqId;
    // var league = $resource('http://api.football-data.org/v1/soccerseasons/'+id+'/teams');
    var promise = FootballService.getTeamDetails(id);
    promise.then(function(data){
      vm.leaguDetails_data = data;

    },function(err){

    })
  
  }]);


angularApp.service('FootballService',['$resource','$q',function($resource,$q){

  var vm = this;

  vm.getTeamDetails = function(leagueId){
    var leagueDetailsResource = $resource('http://api.football-data.org/v1/soccerseasons/'+ leagueId +'/teams');
    var rsp = leagueDetailsResource.get();
    var deferred = $q.defer();
    rsp.$promise.then(function(data){
      console.log(data);
      angular.forEach(data.teams,function(element,index){
        console.log(element);
        var self_link = element._links.self.href.split('/');
        element.teamId = self_link[self_link.length - 1];
        console.log(self_link);
      });
      console.log(data.teams);
      deferred.resolve(data);
    },function(err){
      console.log(err);
      deferred.reject(err);
    })
    return deferred.promise;
}

}]);

angularApp.controller("PlayerController",['$resource','$routeParams','$http',
function($resource,$routeParams,$http){
  vm = this;
  var id = $routeParams.uniqId;
  var playerResource = $resource('http://api.football-data.org/v1/teams/'+ id +'/players');
  vm.playerResponse = playerResource.get();
  console.log(vm.playerResponse);

  vm = this;
  var id = $routeParams.uniqId;
  var fixturesResource = $resource('http://api.football-data.org/v1/teams/'+ id +'/fixtures');
  vm.fixturesResponse = fixturesResource.get();
  console.log(vm.fixturesResponse);
}]);