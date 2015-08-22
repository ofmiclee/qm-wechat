angular.module('app.ctrl', ['ui.router', 'ngMaterial', 'app.service'])
// 首页
.controller('IndexCtrl',['$scope', '$http', 'KeyNames', '$mdDialog',
function($scope, $http, KeyNames, $mdDialog){
    // $http.get('www.baidu.com');
    var DialogController = function($scope, $http, $mdDialog) {
        $http.get(KeyNames.domain + '/oauth/req')
        .then(function(authLink){
            $scope.authLink = authLink.data.url;
            // window.open('http://wechat.qianmi.com/oauth/req');
        });
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    };
    $scope.fade = false;
    $scope.getOauth = function() {
        $http.get(KeyNames.domain + '/oauth/req')
        .then(function(authLink){
            $scope.authLink = authLink.data.url;
            // window.open('http://wechat.qianmi.com/oauth/req');
        });
    };
    $scope.show = function() {
        $scope.fade = true;
        $scope.getOauth();
    };
    $scope.showAuthDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'template/auth.pop.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
}])
// 主面板
.controller('MainCtrl', ['$scope', '$rootScope'  ,'$http', 'KeyNames', '$state',
'$stateParams',
function($scope, $rootScope, $http, KeyNames, $state, $stateParams){
    $scope.authGroup = [
        {name:'消息与菜单权限集', key: 1},
        {name:'帐号管理权限集', key: 2},
        {name:'网页授权权限集', key: 3},
        {name:'微信小店权限集', key: 4},
        {name:'多客服权限集', key: 5},
        {name:'业务通知权限集', key: 6},
        {name:'微信卡券权限集', key: 7},
        {name:'素材管理权限集', key: 8},
        {name:'摇一摇周边权限集', key: 9},
        {name:'线下门店权限集', key: 10},
        {name:'微信连WIFI权限集', key: 11},

    ];
    var appid = $stateParams.appid;
    var getBaseInfo = function() {
        $http.get(KeyNames.domain + '/srv/account/info/' + appid)
        .then(function(baseInfo){
            $rootScope.baseInfo = baseInfo;
        });
    };
}])
// 基础信息
.controller('BaseInfoCtrl', ['$scope', '$http', 'KeyNames', '$state',
'$stateParams',
function($scope, $http, KeyNames, $state, $stateParams){
    // $http.get('www.baidu.com');

}]);
