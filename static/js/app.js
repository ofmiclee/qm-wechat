// main loading
angular.module('app', ['ui.router'])
.constant('KeyNames',{'domain': 'http://wechat.qianmi.com'})
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 'KeyNames',
function($httpProvider, $stateProvider, $urlRouterProvider, KeyNames) {
  // $httpProvider.interceptors.push('errorRecoverer');
  // $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('index', {
      url: "",
      controller: 'IndexCtrl',
      templateUrl: 'template/index.html'
  });
  //   .state('home', {
  //     url: "/home",
  //     views: {
  //       "mainview": {templateUrl: "template/home.html"},
  //       "naviview": { templateUrl: 'template/navi.logon.html' }
  //     }
  //   })
  //   .state('setting', {
  //     url: "/setting",
  //     views: {
  //       "mainview": {templateUrl: "template/setting.html"},
  //       "naviview": { templateUrl: 'template/navi.logon.html' }
  //     }
  //   })
  //   .state('search', {
  //     url: "/search",
  //     views: {
  //       "mainview": {templateUrl: "template/search.html"},
  //       "naviview": { templateUrl: 'template/navi.logon.html' }
  //     }
  //   })
  //   .state('profile', {
  //     url: "/profile",
  //     views: {
  //       "mainview": {templateUrl: "template/profile.html"},
  //       "naviview": {templateUrl: "template/navi.logon.html"}
  //     }
  //   })
  //   .state('error', {
  //     url: '/error/:type',
  //     views: {
  //       'mainview': {
  //         templateUrl: 'template/error.html',
  //         // controller: function($scope,$stateParams) {
  //         //   $scope.error = 404;
  //         // }
  //         controllerProvider: function($stateParams) {
  //           var ctrl = function(){};
  //         }
  //       },
  //       'naviview': {templateUrl: 'template/navi.logon.html'}
  //     }
  // });
}])
.controller('IndexCtrl',['$scope', '$http', 'KeyNames',
function($scope, $http, KeyNames){
    // $http.get('www.baidu.com');
    console.log('asdasd');
    $scope.auth = function() {
        $http.get(KeyNames.domain + '/auth/req')
        .then(function(authLink){
            window.open(authLink);
            // window.open('http://wechat.qianmi.com/oauth/req');
        });
    };
}])
.controller('MainCtrl', ['$scope', '$http', 'KeyNames',
function($scope, $http, KeyNames){
    // $http.get('www.baidu.com');
    console.log('asdasd');
    $scope.auth = function() {
        $http.get(KeyNames.domain + '/auth/req')
        .then(function(authLink){
            window.open('');
        });
    };
}]);
