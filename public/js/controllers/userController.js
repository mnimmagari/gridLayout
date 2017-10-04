angular.module('userApp', ['angular-pagin-layout','layout']).controller('userController',['$http','$scope', function($http,$scope) {
    $scope.users=[];
    $scope.totalcount = 0;
    $scope.itemsPerPage = 12;
    getResultsPage(1);

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(newPage){
        $http.get('/api/users?pagenumber='+newPage+'&itemsPerPage='+$scope.itemsPerPage).then(function(response){
         $scope.users = response.data.data;
         $scope.totalcount = response.data.totalCount;
     });
    };


}]);