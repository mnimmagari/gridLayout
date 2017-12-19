angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/task', {
			templateUrl: 'mods/task/task.html',
			controller: 'taskController'
		})

		.when('/user', {
			templateUrl: 'mods/user/user.html',
			controller: 'userController'
		});

	$locationProvider.html5Mode(true);

}]);
