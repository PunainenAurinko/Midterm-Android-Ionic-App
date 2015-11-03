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

// LIST SERVICE

.service('ListService', function (LocalStorageService, $stateParams) {
    
    this.params = $stateParams.id;

    console.log(this.params);

    if (LocalStorageService.getStorage($stateParams.id) == this.list || LocalStorageService.getStorage($stateParams.id) == 0) {
        
        console.log('From fresh: ' + this.params);

        if (this.params == ':list-one') {

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
        } else if (this.params == ':list-two') {

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
        } else if (this.params == ':list-three') {

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
            
        }

        LocalStorageService.setStorage($stateParams.id, this.list);

    } else {

        console.log('From storage: ' + this.params);
        
        this.list = LocalStorageService.getStorage($stateParams.id, this.list);

    }

    this.getList = function () {
        
        return this.list;
        
    };

    this.addToList = function (item) {

        this.list.push({
            'title': item,
            'done': false
        });

        LocalStorageService.setStorage($stateParams.id, this.list);

        return this.list;

    };

    this.removeFromList = function () {

        this.list = this.list.filter(function (listItem) {

            return !listItem.done;

        })

        LocalStorageService.setStorage($stateParams.id, this.list);

        return this.list;

    }

    this.deleteFromList = function (index) {

        this.list.splice(index, 1);

        LocalStorageService.setStorage($stateParams.id, this.list);

        return this.list;

    }

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