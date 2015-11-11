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

        if (!LocalStorageService.getStorage(key)) { // display the default list for the app initial state

            LocalStorageService.setStorage(key, this.lists[key]);

            return this.lists[key];

        } else {

            this.lists[key] = (LocalStorageService.getStorage(key, this.lists[key]) || this.lists[key]); // assign the list to the list from storage, or, if it is null (when we opened the app for the first time), to the default list

            LocalStorageService.setStorage(key, this.lists[key]);

            return this.lists[key];

        }

    };

    this.addToList = function (key, item) {

        this.lists[key].push({
            'title': item,
            'done': false
        });

        LocalStorageService.setStorage(key, this.lists[key]);

        return this.lists[key];

    };

    this.removeFromList = function (key) {

        this.lists[key] = this.lists[key].filter(function (item) {

            return !item.done;

        })

        LocalStorageService.setStorage(key, this.lists[key]);

        return this.lists[key];

    }

    this.deleteFromList = function (key, index) {

        this.lists[key].splice(index, 1);

        LocalStorageService.setStorage(key, this.lists[key]);

        return this.lists[key];

    }

})

// DEVICE SERVICE

.factory('DeviceService', function (LocalStorageService, $cordovaVibration, $cordovaLocalNotification) {

    return {

        // VIBRATE THE DEVICE

        vibrate: function (duration) {

            if (LocalStorageService.getStorage('vibrate', 'true')) {

                document.addEventListener('deviceready', function () { // deviceready event listener added so that this only runs on the device, not in browser, otherwise the browser console.log gives an error - 'Cannot read property 'vibrate' of undefined'

                    $cordovaVibration.vibrate(duration);

                }, false);

            }

        },

        // TRIGGER LOCAL NOTIFICATION

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