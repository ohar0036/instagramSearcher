angular.module('instagramApp', ['ngMessages', 'ngAnimate'])
.controller('instagramCtrl', function($scope, $http, $q, $timeout) {

 // hides the message
  $scope.searching = false;
  $scope.instaImages = null;


  $scope.submitForm = function() {
    if($scope.tagSearch.$valid) {
      console.log('it werks');
      $scope.searching = true;
      $scope.getJSONData();

    }
    else {
      console.log('invalid!!');
      $scope.message = "Please provide a word that is 2 or more characters long."
    }
  };


  $scope.getJSONData = function() {

    $http.jsonp('https://api.instagram.com/v1/tags/'+$scope.tag+'/media/recent', 
          {
            'params':{
                'client_id':'28ec0963147a413caf58b6aa760e380b',
                'callback':'JSON_CALLBACK',
                'count' : 12
            }
          }).success(function(data) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("Success here");
        console.log(data);
        $timeout(function(){
          $scope.tag = '';
          $scope.searching = false;
        }, 500);
        $scope.instaImages = [];
        if(data.data != undefined){
          $scope.instaImages = data.data;
        }

        /*if(data.meta.error_message) {
          
          console.log(data.meta.error_message);
        }
        else {
          console.log(data.data[0].link);
          console.log(data.data[0].images.standard_resolution.url);
          console.log($scope.instaImages);
        }*/

      }).error(function(data) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Error here");
      });

  };

});





