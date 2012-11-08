openPopups = [];

angular.module('locationShare', ['ssAngular'])
  .config(function(authProvider,$routeProvider,$locationProvider) {
    authProvider.authServiceModule('example');
    authProvider.loginPath('/login');
    $routeProvider.
      when('/login', {controller:'AuthCtrl', templateUrl:'login.html'}).
      when('/app', {controller:'SSCtrl', templateUrl:'app.html'}).
      when('/properties/:tracker', {controller:'SSProperties', templateUrl:'properties.html'}).
      when('/property/:tracker/:property', {controller:'SSProperty', templateUrl:'property.html'}).
      when('/info/:tracker', {controller:'SSInfo', templateUrl:'info.html'}).
      otherwise({redirectTo:'/app'});
    $locationProvider.html5Mode(false);
  })
  .controller('SSCtrl',function($scope,$location,pubsub,rpc,model,auth) {
    $scope.messages = []
    $scope.streaming = false;
    $scope.status = "";


    $scope.$on('$destroy', function() {
      if($scope.streaming) {
        rpc('example.off', 'Navigated away');
      }
    });

    $scope.logout = function() {
      var promise = auth.logout();
      promise.then(function() { 
        $location.path("/"); 
      });
    }
  })
  .controller('SSProperties',function($scope,$location,pubsub,rpc,model,auth, $routeParams) {

  	$scope.tracker = connectedTrackers[$routeParams.tracker];
  	$scope.capabilities = capabilities[$scope.tracker.protocol];
  	//$scope.capabilities = $scope.tracker.capabilities;
  	//console.log('capabilities');
  	console.log($scope.capabilities);
  	
  })
  .controller('SSProperty',function($scope,$location,pubsub,rpc,model,auth, $routeParams) {
  	//$scope.capabilities = require('/capabilities').capabilities;
  	$scope.tracker = connectedTrackers[$routeParams.tracker];
  	$scope.capabilities = capabilities[$scope.tracker.protocol];
  	
  	console.log('property');
  	console.log($routeParams);
  	$scope.property = $scope.capabilities.commands[$routeParams.property];
  	console.log($scope.property);
  	
  	$scope.propertyValidation = function(property) {
  		return new RegExp(property.pattern);
  	};
  
  	
  	$scope.propertyName = $routeParams.property;

    $scope.value = {};
  	console.log('SSProperty');
  	console.log($scope.$propertyName);
  	
  	
	$scope.set = function() {
		console.log($scope.password);
		console.log($scope);
		$errorCode = null;
		ss.rpc('tracker.sendCommand', $scope.tracker.id, $scope.propertyName, $scope.value, function(error) {
			$scope.$apply(function() {
				console.log(error);
				$scope.errorCode = error;
				console.log("command sent");
				if (error == null) {
					window.location.href = "/#";
				}
			});

		});
	}; 

  	//console.log($scope.capabilities);
  	
  })
  .controller('SSInfo',function($scope,$location,pubsub,rpc,model,auth, $routeParams) {
  	//$scope.capabilities = require('/capabilities').capabilities;
  	//console.log('test');
  	console.log('SSInfo');
  	console.log($routeParams.tracker);
  	$scope.tracker = connectedTrackers[$routeParams.tracker];
  	console.log($scope.tracker); 
  	
  	$scope.zoom = function() {
  		var location = $scope.tracker.location;
		var pinLocation = new google.maps.LatLng(location.latitude, location.longitude);
  		map.setCenter(pinLocation);
		map.setZoom(16);
		window.location.href = "/#";
  	};
  	
  	
	$scope.update = function() {

		ss.rpc('tracker.command', $scope.tracker.id, "update", function(status) {
			window.location.href = "/#";
		});
	}; 

  })
  .controller('AuthCtrl',function($scope, $location, $log, auth) {
    $scope.processAuth = function() {
      $scope.showError = false;
      var promise = auth.login($scope.user, $scope.password);
      promise.then(function(reason) {
        $log.log(reason);
        var newPath = '/app';
        if($scope.redirectPath) {
          newPath = $scope.redirectPath;
        }
        $location.path(newPath);
      }, function(reason) {
        $log.log(reason);
        $scope.showError = true;
        $scope.errorMsg = "Invalid login. The username and pass for the example app is user/pass";
      });
    };
  });
