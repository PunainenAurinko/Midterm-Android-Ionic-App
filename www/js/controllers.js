angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

})

// *****************************************
//
//          LIST CONTROLLER
//
// *****************************************

.controller('ListCtrl', function ($scope, list, ListService, VibrationService, NotificationService) {

    // CLEAR LOCAL STORAGE

//    localStorage.clear(); // used for testing

    // GET LIST ITEMS

//    console.log('Initial state list: ' + list);

    $scope.items = ListService.getList(list);
    
    $scope.data = { item: '' };

//    console.log('Get list state list: ' + list);

    // ADD NEW ITEM TO THE LIST

    $scope.addItem = function () {

        //        console.log('Add item function list: ' + list);

        $scope.items = ListService.addToList(list, $scope.data.item);

        $scope.data.item = '';
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {

        //        console.log('Clear completed function list: ' + list);

        $scope.items = ListService.removeFromList(list);

        // VIBRATE THE DEVICE WHEN CLEARING A COMPLETED ITEM

        if (document.querySelector('span[class="ng-binding done"]')) { // prevent vibration if pressing a button when there is nothing to complete

            VibrationService.vibrate(300);

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        if ($scope.items == '' && document.querySelector('span[class="ng-binding done"]')) {

            NotificationService.notify({

                title: 'Congratulations!',
                text: 'You have completed all of your items!'

            })
        }
    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {

        //        console.log('Delete item function list: ' + list);

        $scope.items = ListService.deleteFromList(list, index);

        // VIBRATE THE DEVICE WHEN DELETING AN ITEM

        VibrationService.vibrate(200);

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        if ($scope.items == '') {

            NotificationService.notify({

                title: 'Congratulations!',
                text: 'You have completed all of your items!'

            })
        }

    }

})

.controller('SettingsCtrl', function ($scope, LocalStorageService) {

    $scope.vibrate = {};

    $scope.vibrate.on = LocalStorageService.getStorage('vibrate') === true;

    $scope.toggleVibration = function () {

        LocalStorageService.setStorage('vibrate', $scope.vibrate.on);

    }

    $scope.notify = {};

    $scope.notify.on = LocalStorageService.getStorage('notify') === true;

    $scope.toggleNotification = function () {

        LocalStorageService.setStorage('notify', $scope.notify.on);

    }

});