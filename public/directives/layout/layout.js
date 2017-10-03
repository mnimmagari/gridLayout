(function() {
	var moduleName = 'layout';

	angular.module(moduleName, [])
	.directive('cardLayout',[cardLayoutFn]);

	function cardLayoutFn(){
		return {
			template: '<ng-include src="getTemplateUrl()"/>',
			scope: { 
				user: '=data'
			},
			restrict: 'AE',
			controller: function($scope) {
				$scope.getTemplateUrl = function() {
					if ($scope.user.association== "employee"){
						return "/public/templates/users/employee.html";
					}
					if ($scope.user.association== "customer"){
						return "/public/templates/users/customer.html";
					}
					if($scope.user.association== "" || $scope.user.association== undefined || $scope.user.association==null){
						return "/public/templates/users/default.html";
					}
				}
			}    	

		};
	}
})();
