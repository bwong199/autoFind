'use strict';

// Cars controller
angular.module('cars').controller('CarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cars','UrlService',
  function ($scope, $stateParams, $location, Authentication, Cars, UrlService) {
    $scope.authentication = Authentication;

    // Create new Car
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'carForm');

        return false;
      }

      // Create new Car object
      var car = new Cars({
        title: this.title,
        price: this.price, 
        make: this.make, 
        model: this.model, 
        type: this.type, 
        year: this.year, 
        description: this.description, 
        imageurl: this.imageurl, 
        state: this.state, 
        contact_email: this.contact_email




      });

      // Redirect after save
      car.$save(function (response) {
        $location.path('cars/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.price = ''; 
        $scope.make = '';
        $scope.model = '';
        $scope.type = '';
        $scope.year = '';
        $scope.description = '';
        $scope.imageurl = '';
        $scope.state = '';
        $scope.contact_email = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Car
    $scope.remove = function (car) {
      if (car) {
        car.$remove();

        for (var i in $scope.cars) {
          if ($scope.cars[i] === car) {
            $scope.cars.splice(i, 1);
          }
        }
      } else {
        $scope.car.$remove(function () {
          $location.path('cars');
        });
      }
    };

    // Update existing Car
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'carForm');

        return false;
      }

      var car = $scope.car;

      car.$update(function () {
        $location.path('cars/' + car._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Cars
    $scope.find = function () {
      $scope.cars = Cars.query();
    };

    $scope.search = function () {
      console.log(UrlService.getQueryStringvar('make'));

      var make = UrlService.getQueryStringvar('make');
      var model = UrlService.getQueryStringvar('model');
      var state = UrlService.getQueryStringvar('state');
      var type = UrlService.getQueryStringvar('type');
      var query = {};

      if(make !== 0){
        query.make = make;
      }
      if(model !== 0){
        query.model = model;
      }
      if(state !== 0){
        query.state = state;
      }
      if(type !== 0){
        query.type = type;
      }
      $scope.cars = Cars.query(query);
    };

    // Find existing Car
    $scope.findOne = function () {
      $scope.car = Cars.get({
        carId: $stateParams.carId
      });
    };
  }
]);
