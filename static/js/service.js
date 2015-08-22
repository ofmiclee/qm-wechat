angular.module('app.service', [])
.factory('appInterceptor', ["$q","$log",
function($q,$log){
	return {
		// optional method
	    'request': function(config) {
	      // do something on success
	      return config;
	    },

	    // optional method
	   'requestError': function(rejection) {
	      // do something on error
	      if (canRecover(rejection)) {
	        return responseOrNewPromise;
	      }
	      return $q.reject(rejection);
	    },
	    'response': function(response) {
	      // do something on success
				if(response.data) {
					// 去掉data节点
					response = data;
				} else {
                    return $q.reject(response);
                }
	      return response;
	    },

	    // optional method
	   'responseError': function(rejection) {
	   	  var message = '系统异常！';
	   	  if(rejection.status === 0 || rejection.status === 500 || rejection.status === 404){
	   	  	  message = '服务器异常，请稍后再试';
	   	  }
	      return $q.reject({message:message});
	    }
	};
}])
.factory('appXHR', ['$q', '$http', function ($q, $http) {
    return {
        get: function(route) {
            return $http.get(route).success(function(res){
                // TODO
            });
        },
        post: function(route, data) {
            return $http.post(route).success(function(res){
                // TODO
            });
        }
    };
}]);
