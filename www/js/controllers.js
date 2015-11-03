angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $window, $ionicModal, $timeout) {

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

/*

TO-DO - CREATE APP SETTINGS PAGE

Settings section in the application must be created with two options:

Vibrate on item complete (toggle on/off):   http://ngcordova.com/docs/plugins/vibration/  (Links to an external site.)which wraps https://github.com/apache/cordova-plugin-vibration (Links to an external site.)  
Notify when list completed (toggle on/off): http://ngcordova.com/docs/plugins/localNotification/ (Links to an external site.) which  wraps https://github.com/katzer/cordova-plugin-local-notifications (Links to an external site.)


*/

// *****************************************
//
//          LIST ONE CONTROLLER
//
// *****************************************

.controller('ListOneCtrl', function ($scope, $state, $stateParams, $location, ListOneService, VibrationService, NotificationService) {

    // CLEAR LOCAL STORAGE

    //    localStorage.clear(); // used for testing

    // GET DEFAULT LIST ITEMS

        $scope.items = ListOneService.getList();
    
        console.log($state.current);
        console.log($state.current.name);
    
        console.log($stateParams);
    
        console.log($location);


    // ADD NEW ITEM TO THE LIST

    $scope.addItem = function () {

        $scope.items = ListOneService.addToList(this.item);

        this.item = '';
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {

        $scope.items = ListOneService.removeFromList();

        // VIBRATE THE DEVICE WHEN CLEARING A COMPLETED ITEM

        if (document.querySelector('span[class="ng-binding done"]')) { // prevent vibration if pressing a button when there is nothing to complete

            VibrationService.vibrate();

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyOnceDone();

    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {

        $scope.items = ListOneService.deleteFromList(index);

        // VIBRATE THE DEVICE WHEN DELETING AN ITEM

        VibrationService.vibrate();

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyOnceDone();

    }

});
//
//// *****************************************
////
////          LIST TWO CONTROLLER
////
//// *****************************************
//
//.controller('ListTwoCtrl', function ($scope, LocalStorageService, ListTwoService, $cordovaVibration, NotificationService) {
//
//    // LIST TWO ITEMS
//
//    if (LocalStorageService.getStorage('listTwo') == $scope.items || LocalStorageService.getStorage('listTwo') == 0) {
//
//        $scope.items = ListTwoService.getList();
//
//    } else {
//
//        $scope.items = LocalStorageService.getStorage('listTwo', $scope.items);
//
//    }
//
//    LocalStorageService.setStorage('listTwo', $scope.items);
//
//    // ADD ITEMS TO THE LIST
//
//    $scope.data = {};
//
//    $scope.addItem = function () {
//
//        if ($scope.data.newItem) {
//
//            $scope.items.push({
//                'title': $scope.data.newItem,
//                'done': false
//            });
//
//            $scope.data.newItem = '';
//
//            LocalStorageService.setStorage('listTwo', $scope.items);
//        }
//    }
//
//    // CLEAR COMPLETED ITEMS
//
//    $scope.clearCompleted = function () {
//        $scope.items = $scope.items.filter(function (listItem) {
//            return !listItem.done;
//        })
//
//        LocalStorageService.setStorage('listTwo', $scope.items);
//
//        if (document.querySelector('span[class="ng-binding done"]')) {
//
//            document.addEventListener('deviceready', function () {
//                $cordovaVibration.vibrate(200);
//            }, false);
//
//        }
//
//        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED
//
//        NotificationService.notifyOnceDone();
//
//    }
//
//    // DELETE AN ITEM FROM THE LIST
//
//    $scope.deleteItem = function (index) {
//        $scope.items.splice(index, 1);
//        LocalStorageService.setStorage('listTwo', $scope.items);
//        document.addEventListener('deviceready', function () {
//            $cordovaVibration.vibrate(200);
//        }, false);
//
//        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED
//
//        NotificationService.notifyOnceDone();
//
//    }
//})
//
//// *****************************************
////
////          LIST THREE CONTROLLER
////
//// *****************************************
//
//.controller('ListThreeCtrl', function ($scope, LocalStorageService, ListThreeService, $cordovaVibration, NotificationService) {
//
//    // LIST THREE ITEMS
//
//    if (LocalStorageService.getStorage('listThree') == $scope.items || LocalStorageService.getStorage('listThree') == 0) {
//
//        $scope.items = ListThreeService.getList();
//
//    } else {
//
//        $scope.items = LocalStorageService.getStorage('listThree', $scope.items);
//
//    }
//
//    LocalStorageService.setStorage('listThree', $scope.items);
//
//    // ADD ITEMS TO THE LIST
//
//    $scope.data = {};
//
//    $scope.addItem = function () {
//
//        if ($scope.data.newItem) {
//
//            $scope.items.push({
//                'title': $scope.data.newItem,
//                'done': false
//            });
//
//            $scope.data.newItem = '';
//
//            LocalStorageService.setStorage('listThree', $scope.items);
//        }
//    }
//
//    // CLEAR COMPLETED ITEMS
//
//    $scope.clearCompleted = function () {
//        $scope.items = $scope.items.filter(function (listItem) {
//            return !listItem.done;
//        })
//
//        LocalStorageService.setStorage('listThree', $scope.items);
//
//        if (document.querySelector('span[class="ng-binding done"]')) {
//
//            document.addEventListener('deviceready', function () {
//                $cordovaVibration.vibrate(200);
//            }, false);
//
//        }
//
//        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED
//
//        NotificationService.notifyOnceDone();
//
//    }
//
//    // DELETE AN ITEM FROM THE LIST
//
//    $scope.deleteItem = function (index) {
//        $scope.items.splice(index, 1);
//        LocalStorageService.setStorage('listThree', $scope.items);
//        document.addEventListener('deviceready', function () {
//            $cordovaVibration.vibrate(200);
//        }, false);
//
//        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED
//
//        NotificationService.notifyOnceDone();
//
//    }
//});