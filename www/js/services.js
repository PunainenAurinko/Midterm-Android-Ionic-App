angular.module('starter.services', [])

.factory('LocalStorageService', function ($localStorage) {

    return {

        setStorage: function (key, value) {
            $localStorage[key] = value;
        },

        getStorage: function (key) {
            return $localStorage[key];
        }

    };

})

.service('ListOneService', function () {

    this.list = [
        {
            'title': 'Learn some stuff',
            'done': false
        },
        {
            'title': 'Code some stuff',
            'done': false
        },
        {
            'title': 'Code some more',
            'done': false
        }
            ];

    this.getList = function () {
        return this.list;
    };

    this.saveList = function (list) {
        this.list = list;
    };
})

.service('ListTwoService', function () {

    this.list = [
        {
            'title': 'Forget some stuff',
            'done': false
                    },
        {
            'title': 'Undo some stuff',
            'done': false
                    },
        {
            'title': 'Forget some more',
            'done': false
                    }
            ];

    this.getList = function () {
        return this.list;
    };

    this.saveList = function (list) {
        this.list = list;
    };
})

.service('ListThreeService', function () {

    this.list = [
        {
            'title': 'Repeat some stuff',
            'done': false
                    },
        {
            'title': 'Recode some stuff',
            'done': false
                    },
        {
            'title': 'Repeat some more',
            'done': false
                    }
            ];

    this.getList = function () {
        return this.list;
    };

    this.saveList = function (list) {
        this.list = list;
    };
});

//.factory('ClearItemService', function (LocalStorageService) {
//
//    return {
//
//        clearItem: function () {
//            $scope.items = $scope.items.filter(function (listItem) {
//                return !listItem.done;
//            })
//
//            LocalStorageService.setStorage('listOne', $scope.items);
//
//            if (document.querySelector('span[class="ng-binding done"]')) {
//
//                document.addEventListener("deviceready", function () {
//                    $cordovaVibration.vibrate(200);
//                }, false);
//            }
//        }
//    }
//});