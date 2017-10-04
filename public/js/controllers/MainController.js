angular.module('mainApp', ['angular-pagin-layout','layout']).controller('MainController',['$http','$scope', function($http,$scope) {
	$scope.tasks=[];
	$scope.totalcount = 0;
	$scope.itemsPerPage = 12;
	$scope.type = 'brief';
	getResultsPage(1);

	$scope.pageChanged = function(newPage) {
		getResultsPage(newPage);
	};

	function getResultsPage(newPage){
		$http.get('/api/tasks?pagenumber='+newPage+'&itemsPerPage='+$scope.itemsPerPage).then(function(response){
			$scope.tasks = response.data.data;
			$scope.totalcount = response.data.totalCount;
		});
	};
}]);