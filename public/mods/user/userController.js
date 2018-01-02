angular.module('userApp', ['angular-pagin-layout', 'layout']).controller('userController', ['$http', '$scope', function($http, $scope) {
  $scope.users = [];
  $scope.totalcount = 0;
  $scope.searchfield = '';
  $scope.itemsPerPage = 12;

  $scope.pageChanged = function(newPage) {
    $scope.getResultsPage(newPage);
  };

  $scope.thisFunction = function(user) {
    if (user.association == "employee") {
      return "/public/templates/users/employee.html";
    }
    if (user.association == "customer") {
      return "/public/templates/users/customer.html";
    }
    if (user.association == "" || user.association == null || user.association == undefined) {
      return "/public/templates/users/default.html";
    }
  };

  $scope.getResultsPage = function(newPage) {
    var query = {
      $or: [{
          'email': {
            $regex: $scope.searchfield,
            $options: 'i'
          }
        },
        {
          'name.first': {
            $regex: $scope.searchfield,
            $options: 'i'
          }
        },
        {
          'name.last': {
            $regex: $scope.searchfield,
            $options: 'i'
          }
        }
      ]
    }
    var queryS = JSON.stringify(query);

    userListTempUrl = '/api/users?pagenumber=' + newPage + '&itemsPerPage=' + $scope.itemsPerPage;
    if ($scope.searchfield) {
      userListTempUrl = '/api/users?pagenumber=' + newPage + '&itemsPerPage=' + $scope.itemsPerPage + '&query=' + encodeURIComponent(queryS);
    }
    $http.get(userListTempUrl).then(function(response) {
      $scope.users = response.data.data;
      $scope.totalcount = response.data.totalCount;
    });
  };
  $scope.getResultsPage(1);

}]);