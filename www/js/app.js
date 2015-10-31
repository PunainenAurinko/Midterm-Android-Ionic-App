// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngStorage'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.default', {
        url: '/default',
        views: {
            'menuContent': {
                templateUrl: 'templates/default.html'
            }
        }
    })

    .state('app.listOne', {
        url: '/list-one',
        views: {
            'menuContent': {
                templateUrl: 'templates/list-one.html',
                controller: 'ListOneCtrl'
            }
        }
    })

    .state('app.listTwo', {
            url: '/list-two',
            views: {
                'menuContent': {
                    templateUrl: 'templates/list-two.html',
                    controller: 'ListTwoCtrl'
                }
            }
        })
        .state('app.listThree', {
            url: '/list-three',
            views: {
                'menuContent': {
                    templateUrl: 'templates/list-three.html',
                    controller: 'ListThreeCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/default');
});