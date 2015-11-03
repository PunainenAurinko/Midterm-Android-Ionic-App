angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $window, $state, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.reloadState = function () {

        $window.location.reload();

    }
    
})

// *****************************************
//
//          LIST CONTROLLER
//
// *****************************************

.controller('ListCtrl', function ($scope, ListService, VibrationService, NotificationService) {

    // CLEAR LOCAL STORAGE

//        localStorage.clear(); // used for testing

    // GET DEFAULT LIST ITEMS

    $scope.items = ListService.getList();
    
    // ADD NEW ITEM TO THE LIST

    $scope.addItem = function () {

        $scope.items = ListService.addToList(this.item);

        this.item = '';
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {

        $scope.items = ListService.removeFromList();

        // VIBRATE THE DEVICE WHEN CLEARING A COMPLETED ITEM

        if (document.querySelector('span[class="ng-binding done"]')) { // prevent vibration if pressing a button when there is nothing to complete

            VibrationService.vibrate();

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyOnceDone();

    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {

        $scope.items = ListService.deleteFromList(index);

        // VIBRATE THE DEVICE WHEN DELETING AN ITEM

        VibrationService.vibrate();

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyOnceDone();

    }

})

.controller('SettingsCtrl', function ($scope) {

//    $scope.checked = false;

});