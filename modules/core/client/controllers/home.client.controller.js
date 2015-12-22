'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Cars',
  function ($scope, Authentication, Cars) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.find = function () {
      $scope.cars = Cars.query();
      
    };
  }



]);
