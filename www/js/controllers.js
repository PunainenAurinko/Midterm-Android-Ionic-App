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
//          LIST ONE CONTROLLER
//
// *****************************************

.controller('ListOneCtrl', function ($scope, LocalStorageService, ListOneService, $cordovaVibration, NotificationService) {

    // LIST ONE ITEMS

    //        localStorage.clear();

    if (LocalStorageService.getStorage('listOne') == $scope.items || LocalStorageService.getStorage('listOne') == 0) {

        $scope.items = ListOneService.getList();

    } else {

        $scope.items = LocalStorageService.getStorage('listOne', $scope.items);

    }

    LocalStorageService.setStorage('listOne', $scope.items);

    // ADD ITEMS TO THE LIST

    $scope.data = {};

    $scope.addItem = function () {

        $scope.items.push({
            'title': $scope.data.newItem,
            'done': false
        });

        $scope.data.newItem = '';

        LocalStorageService.setStorage('listOne', $scope.items);

    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {
        $scope.items = $scope.items.filter(function (listItem) {
            return !listItem.done;
        })

        LocalStorageService.setStorage('listOne', $scope.items);

        if (document.querySelector('span[class="ng-binding done"]')) {

            document.addEventListener('deviceready', function () {
                $cordovaVibration.vibrate(200);
            }, false);

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {
        $scope.items.splice(index, 1);
        LocalStorageService.setStorage('listOne', $scope.items);
        document.addEventListener('deviceready', function () {
            $cordovaVibration.vibrate(200);
        }, false);

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }
})

// *****************************************
//
//          LIST TWO CONTROLLER
//
// *****************************************

.controller('ListTwoCtrl', function ($scope, LocalStorageService, ListTwoService, $cordovaVibration, NotificationService) {

    // LIST TWO ITEMS

    if (LocalStorageService.getStorage('listTwo') == $scope.items || LocalStorageService.getStorage('listTwo') == 0) {

        $scope.items = ListTwoService.getList();

    } else {

        $scope.items = LocalStorageService.getStorage('listTwo', $scope.items);

    }

    LocalStorageService.setStorage('listTwo', $scope.items);

    // ADD ITEMS TO THE LIST

    $scope.data = {};

    $scope.addItem = function () {

        if ($scope.data.newItem) {

            $scope.items.push({
                'title': $scope.data.newItem,
                'done': false
            });

            $scope.data.newItem = '';

            LocalStorageService.setStorage('listTwo', $scope.items);
        }
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {
        $scope.items = $scope.items.filter(function (listItem) {
            return !listItem.done;
        })

        LocalStorageService.setStorage('listTwo', $scope.items);

        if (document.querySelector('span[class="ng-binding done"]')) {

            document.addEventListener('deviceready', function () {
                $cordovaVibration.vibrate(200);
            }, false);

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {
        $scope.items.splice(index, 1);
        LocalStorageService.setStorage('listTwo', $scope.items);
        document.addEventListener('deviceready', function () {
            $cordovaVibration.vibrate(200);
        }, false);

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }
})

// *****************************************
//
//          LIST THREE CONTROLLER
//
// *****************************************

.controller('ListThreeCtrl', function ($scope, LocalStorageService, ListThreeService, $cordovaVibration, NotificationService) {

    // LIST THREE ITEMS

    if (LocalStorageService.getStorage('listThree') == $scope.items || LocalStorageService.getStorage('listThree') == 0) {

        $scope.items = ListThreeService.getList();

    } else {

        $scope.items = LocalStorageService.getStorage('listThree', $scope.items);

    }

    LocalStorageService.setStorage('listThree', $scope.items);

    // ADD ITEMS TO THE LIST

    $scope.data = {};

    $scope.addItem = function () {

        if ($scope.data.newItem) {

            $scope.items.push({
                'title': $scope.data.newItem,
                'done': false
            });

            $scope.data.newItem = '';

            LocalStorageService.setStorage('listThree', $scope.items);
        }
    }

    // CLEAR COMPLETED ITEMS

    $scope.clearCompleted = function () {
        $scope.items = $scope.items.filter(function (listItem) {
            return !listItem.done;
        })

        LocalStorageService.setStorage('listThree', $scope.items);

        if (document.querySelector('span[class="ng-binding done"]')) {

            document.addEventListener('deviceready', function () {
                $cordovaVibration.vibrate(200);
            }, false);

        }

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }

    // DELETE AN ITEM FROM THE LIST

    $scope.deleteItem = function (index) {
        $scope.items.splice(index, 1);
        LocalStorageService.setStorage('listThree', $scope.items);
        document.addEventListener('deviceready', function () {
            $cordovaVibration.vibrate(200);
        }, false);

        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

        NotificationService.notifyIfCompleted();

    }
});