// main loading
angular.module('app', ['ui.router', 'ngMaterial', 'app.ctrl', 'app.service'])
.constant('KeyNames',{'domain': 'http://wechat.qianmi.com'})
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 'KeyNames',
function($httpProvider, $stateProvider, $urlRouterProvider, KeyNames) {
  // $httpProvider.interceptors.push('errorRecoverer');
  // $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('index', {
      url: "",
      views: {
          'main': {
              controller: 'IndexCtrl',
              templateUrl: 'template/index.html'
          }
      }
  })
  .state('main', {
    url: "/main",
    abstract: true,
    views: {
        'main': {
            controller: 'MainCtrl',
            templateUrl: 'template/main.html'
        }
    }
})
.state('main.baseinfo', {
  url: "/baseinfo/:id",
  views: {
      'pane': {
          controller: 'BaseInfoCtrl',
          templateUrl: 'template/baseinfo.html'
      }
  }
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
}]);
