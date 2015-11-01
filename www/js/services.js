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

// DEFAULT LIST ONE SERVICE

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

// SERVICE TO TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

.factory('NotificationService', function (LocalStorageService, $cordovaLocalNotification) {

    return {

        notifyIfCompleted: function () {

            if (LocalStorageService.getStorage('listOne') == 0) {
                document.addEventListener('deviceready', function () {
                    $cordovaLocalNotification.schedule({
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