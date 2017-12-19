(function() {
	var moduleName = 'layout';

	angular.module(moduleName, [])
	.directive('cardLayout',[cardLayoutFn]);

	function cardLayoutFn(){
		return {
			template: '<ng-include src="getTemplateUrl()"/>',
			replace: true,
			scope: {
				obj: '=data',
				tmpl: '=',
				func: '='
			},
			restrict: 'AE',
			controller: function($scope) {
				$scope.getTemplateUrl = function() {
					// console.log('getTemplateUrl');
					// $scope.func();
					// if ($scope.obj.association== "employee"){
					// 	return "/public/templates/users/employee.html";
					// }
					// if ($scope.obj.association== "customer"){
					// 	return "/public/templates/users/customer.html";
					// }
					// if ($scope.obj.association== "" || $scope.obj.association== null || $scope.obj.association== undefined){
					// 	return "/public/templates/users/default.html";
					// }
					// if ($scope.tmpl == "brief"){
					// 	return "/public/templates/tasks/brief.html";
					// }
					// if ($scope.tmpl == "long"){
					// 	return "/public/templates/tasks/long.html";
					// }
					// if ($scope.tmpl == "short"){
					// 	return "/public/templates/tasks/short.html";
					// }
					return $scope.func();
				}
			}

		};
	}
})();
