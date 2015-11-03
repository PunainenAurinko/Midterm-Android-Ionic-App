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

// LIST ONE SERVICE

.service('ListOneService', function (LocalStorageService, $stateParams) {

    if (LocalStorageService.getStorage('listOne') == this.list || LocalStorageService.getStorage('listOne') == 0) {

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

        LocalStorageService.setStorage('listOne', this.list);

    } else {

        this.list = LocalStorageService.getStorage('listOne', this.list);

    }

    this.getList = function () {
        return this.list;
    };

    this.addToList = function (item) {

        this.list.push({
            'title': item,
            'done': false
        });

        LocalStorageService.setStorage('listOne', this.list);

        return this.list;

    };

    this.removeFromList = function () {

        this.list = this.list.filter(function (listItem) {

            return !listItem.done;

        })

        LocalStorageService.setStorage('listOne', this.list);

        return this.list;

    }

    this.deleteFromList = function (index) {

        this.list.splice(index, 1);

        LocalStorageService.setStorage('listOne', this.list);

        return this.list;

    }

    //    $scope.deleteItem = function (index) {
    //        $scope.items.splice(index, 1);
    //        LocalStorageService.setStorage('listOne', $scope.items);
    //        document.addEventListener('deviceready', function () {
    //            $cordovaVibration.vibrate(200);
    //        }, false);
    //
    //        // TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED
    //
    //        NotificationService.notifyIfCompleted();
    //
    //    }

})

// DEFAULT LIST TWO SERVICE

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
})

// DEFAULT LIST THREE SERVICE

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
})

// VIBRATON SERVICE

.factory('VibrationService', function ($cordovaVibration) {

    return {

        vibrate: function () {

            //            if (document.querySelector('span[class="ng-binding done"]')) {

            document.addEventListener('deviceready', function () {

                $cordovaVibration.vibrate(200);

            }, false);

            //            }

        }

    }

})

// SERVICE TO TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

.factory('NotificationService', function (LocalStorageService, $cordovaLocalNotification) {

    return {

        notifyOnceDone: function () {

            if (LocalStorageService.getStorage('listOne') == 0) {

                document.addEventListener('deviceready', function () {

                    $cordovaLocalNotification.schedule( {

                        id: 1,
                        title: 'Congratulations!',
                        text: "You have completed all of your items!",
                        data: {

                            customProperty: 'custom value'

                        },
                        at: new Date().getTime()
                    }).then(function (result) {

                        console.log('Notification triggered');

                    });
                })
            }
        }
    }
});