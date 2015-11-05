angular.module('starter.services', [])

// LOCAL STORAGE SERVICE

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

// LIST SERVICE

.service('ListService', function (LocalStorageService) {

    // Assign default items for the three lists in the lists object

    this.lists = {
        one: [
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
                ],
        two: [
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
                ],
        three: [
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
            ]
    };

    this.getList = function (key) {

        this.key = key; // assign the 'key' to 'this.key' so that it could be used throughout the service as a key in local storage key/value pair

        //        console.log('key: ' + this.key);

        if (LocalStorageService.getStorage(this.key) != 0) { // check if local storage for the selected list is NOT empty. If local storage for the list is an empty array, the default list will be shown in the view

            this.lists[this.key] = (LocalStorageService.getStorage(this.key, this.lists[this.key]) || this.lists[this.key]); // assign the list to the list from storage, or, if it is null (when we opened the app for the first time), to the default list

        }

        LocalStorageService.setStorage(this.key, this.lists[this.key]);

        return this.lists[this.key];

    };

    this.addToList = function (item) {

        //        console.log('item:' + item);
        //
        //        console.log(this.lists);
        //
        //        console.log('key: ' + this.key);

        this.lists[this.key].push({
            'title': item,
            'done': false
        });

        LocalStorageService.setStorage(this.key, this.lists[this.key]);

        return this.lists[this.key];

    };

    this.removeFromList = function () {

        //        console.log('key: ' + this.key);

        this.lists[this.key] = this.lists[this.key].filter(function (item) {

            return !item.done;

        })

        LocalStorageService.setStorage(this.key, this.lists[this.key]);

        return this.lists[this.key];

    }

    this.deleteFromList = function (index) {

        this.lists[this.key].splice(index, 1);

        LocalStorageService.setStorage(this.key, this.lists[this.key]);

        return this.lists[this.key];

    }

})

// VIBRATON SERVICE

.factory('VibrationService', function ($cordovaVibration, LocalStorageService) {

    return {

        vibrate: function (duration) {

            if (LocalStorageService.getStorage('vibrate', 'true')) {

                document.addEventListener('deviceready', function () { // deviceready event listener added so that this only runs on the device, not in browser, otherwise the browser console.log gives an error - 'Cannot read property 'vibrate' of undefined'

                    $cordovaVibration.vibrate(duration);

                }, false);

            }

        }

    }

})

// NOTIFICATION SERVICE - TRIGGER LOCAL NOTIFICATION WHEN ALL ITEMS ARE COMPLETED

.factory('NotificationService', function ($cordovaLocalNotification, LocalStorageService) {

    return {

        notify: function (message) {

            if (LocalStorageService.getStorage('notify', 'true')) {

                document.addEventListener('deviceready', function () { // deviceready event listener added so that this only runs on the device, not in browser, otherwise the browser console.log gives an error - 'Cannot read property 'plugins' of undefined'

                    $cordovaLocalNotification.schedule({

                        title: message.title,
                        text: message.text

                    }).then(function (result) {

                        console.log('Notification triggered');

                    });
                })
            }
        }
    }
});

//SETTINGS SERVICE

//.factory('SettingsService', function (LocalStorageService, $cordovaVibration, NotificationService) {
//
//    return {
//
//        enableVibration: function (duration) {
//
//            document.addEventListener('deviceready', function () { // deviceready event listener added so that this only runs on the device, not in browser, otherwise the browser console.log gives an error - 'Cannot read property 'vibrate' of undefined'
//
//                $cordovaVibration.vibrate(duration);
//
//            }, false);
//
//        },
//
//        enableNotification: function () {
//
//
//
//        }
//
//    }
//
//});