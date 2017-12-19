angular.module('mainApp', ['angular-pagin-layout','layout']).controller('taskController',['$http','$scope', function($http,$scope) {
	$scope.tasks=[];
	$scope.totalcount = 0;
	$scope.itemsPerPage = 12;
	$scope.type = 'brief';
	getResultsPage(1);

	$scope.pageChanged = function(newPage) {
		getResultsPage(newPage);
	};

	$scope.thisFunction = function(){
		console.log('Task Controller');
		if ($scope.type == "brief"){
			return "/public/templates/tasks/brief.html";
		}
		if ($scope.type == "long"){
			return "/public/templates/tasks/long.html";
		}
		if ($scope.type == "short"){
			return "/public/templates/tasks/short.html";
		}
	};

	function getResultsPage(newPage){
		$http.get('/api/tasks?pagenumber='+newPage+'&itemsPerPage='+$scope.itemsPerPage).then(function(response){
			$scope.tasks = response.data.data;
			$scope.totalcount = response.data.totalCount;
		});
	};
}]);
