(function () {
    'use strict';
    var app = angular.module('app', ['ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.expandable', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.otherwise({ redirectTo: '/' });

            // configure html5 to get links working on jsfiddle
            $locationProvider.html5Mode(true);
        });
})();