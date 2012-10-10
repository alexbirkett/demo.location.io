var TodoCtrl = function ($scope) {
 $scope.capabilities =  
  {
		commands : [ {
			name : "oneTimeLocate",
			passwordRequired : true
		} ],
		properties : [ {
			name : "authorizedNumber",
			count:5,
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "telephoneNumber",
				name : "authorizedNumber"
			} ]
		}, {
			name : "continous-tracking",
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "time-period",
				name : "update-fequency"
			} ]
		},{
			name : "speeding-alarm",
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "boolean",
				name : "enabled"
			},{
				type : "speed",
				name : "speed"
			} ]
		},{
			name : "geoFence",
			count: 5,
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "longitude",
				name : "minLongitude"
			}, {
				type : "longitude",
				name : "maxLongitude"
			}, {
				type : "latitude",
				name : "minLatitude"
			}, {
				type : "latitude",
				name : "maxLatitude"
			} ]
		},{
			name : "timeZone",
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "timezone",
				name : "timezone"
			}]
		},{
			name : "lowBatteryAlarm",
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "boolean",
				name : "enabled"
			},{
				type : "percentage",
				name : "percentage"
			}]
		},{
			name : "changePassword",
			writable:true,
			passwordRequired:true,
			parameters : [ {
				type : "password",
				name : "password"
			}]
		}]
	};
  
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  $scope.addTodo = function() {
  	console.log($scope);	
  	
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  $scope.setProperty = function(param) {
  	console.log($scope);
  	console.log(param);
  };
  
  $scope.data = {
  	
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}

