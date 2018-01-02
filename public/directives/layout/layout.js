(function() {
  var moduleName = 'layout';

  angular.module(moduleName, [])
    .directive('cardLayout', [cardLayoutFn]);

  function cardLayoutFn() {
    return {
      template: '<ng-include src="getTemplateUrl()"/>',
      replace: true,
      scope: {
        obj: '=data',
        tmpl: '=',
        func: '&',
        action: '=action'
      },
      restrict: 'AE',
      controller: function($scope) {
        $scope.getTemplateUrl = function() {
          return $scope.tmpl;
        }
      }

    };
  }
})();