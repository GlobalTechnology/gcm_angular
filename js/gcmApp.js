﻿var _api_url = window._api_url = GCM_APP.api_url;
define( ['angularAMD', 'angular-route', 'angular-bootstrap', 'angular-resource'], function ( angularAMD ) {
	var gcmApp = angular.module( 'gcmApp', ['ngRoute', 'ui.bootstrap', 'ngResource'] )
		.run( function ( $rootScope ) {
			// Attach global constants to root scope
			$rootScope.GCM_APP = window.GCM_APP;
		} )
		.config( function ( $routeProvider, $httpProvider ) {

			// enable CORS on IE <= 9
			//Default behavior since v1.1.1 (http://bit.ly/1t7Vcci)
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

			$routeProvider
				.when( "/map", angularAMD.route( {
					templateUrl: GCM_APP.app_url + "/template/map.html",
					controller:  'mapController'
				} ) )
				.when( "/measurements", angularAMD.route( {
					templateUrl: GCM_APP.app_url + "/template/measurements.html",
					controller:  "measurementsController"
				} ) )
				.when( "/admin", angularAMD.route( {
					templateUrl: GCM_APP.app_url + "/template/admin.html",
					controller:  "adminController"
				} ) )
				.otherwise( {redirectTo: "/map"} );
		} );
	return angularAMD.bootstrap( gcmApp );
} );
