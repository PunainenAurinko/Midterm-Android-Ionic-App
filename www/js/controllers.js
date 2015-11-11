angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

})

// **********************************************
//
//              LIST CONTROLLER
//
//  Just one controller is used for all the lists
//
// **********************************************

.controller('ListCtrl', function ($scope, list, ListService, DeviceService) {

    // CLEAR LOCAL STORAGE

//    localStorage.clear(); // used for testing

    // GET LIST ITEMS

    $scope.items = ListService.getList(list); // list id is used to identify what list we are in
    
    $scope.data = { item: '' };

    // ADD NEW ITEM TO THE LIST

    $scope.addItem = function () {

        $scope.items = ListService.addToList(list, $scope.data.item);

        $scope.data.item = '';
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {

        $scope.items = ListService.removeFromList(list);

        // VIBRATE THE DEVICE WHEN CLEARING A COMPLETED ITEM

        if (document.querySelector('span[class="ng-binding done"]')) { // prevent vibration if pressing a button when there is nothing to complete

            DeviceService.vibrate(300);

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        if ($scope.items == '' && document.querySelector('span[class="ng-binding done"]')) {

            DeviceService.notify({

                title: 'Congratulations!',
                text: 'You have completed all items in list ' + list + '!' // text specifies which list the notificaiton is for

            })
        }
    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {

        $scope.items = ListService.deleteFromList(list, index);

        // VIBRATE THE DEVICE WHEN DELETING AN ITEM

        DeviceService.vibrate(200);

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        if ($scope.items == '') {

            DeviceService.notify({

                title: 'Congratulations!',
                text: 'You have completed all items in list ' + list + '!' // text specifies which list the notificaiton is for

            })
        }

    }

})

// **********************************************
//
//              SETTINGS CONTROLLER
//
// **********************************************

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