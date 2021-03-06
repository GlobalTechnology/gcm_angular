(function () {
	'use strict';

	function Session( $rootScope, $injector, $q, $log, Settings, $location ) {
		var token;

		var startSession = function ( ticket ) {
			if ( "false" === ticket ) {
				window.location = Settings.api.login;
				return false;
			}
			return $injector.get( '$http' ).get( Settings.api.measurements( '/token' ), {params: {st: ticket}} )
				.then( function ( response ) {
					$rootScope.current.user = response.data.user;
					$rootScope.current.sessionToken = response.data.session_ticket;
                    //additional check, be fail safe
                    if (typeof response.data.user_preferences === 'object') {
                        $rootScope.current.user_preferences = response.data.user_preferences;
                    } else {
                        delete $rootScope.current.user_preferences;
                    }

					token = response.data.session_ticket;
					if ( typeof response.data.assignments === 'object' && response.data.assignments.length) {
						$rootScope.current.assignments = response.data.assignments;
					} else {
						delete $rootScope.current.assignments;
					}
					$rootScope.$broadcast( 'sessionStart', response.data );

					return response.data;
				} );
		};

		return {
			startSession:  function ( ticket ) {
				startSession( ticket );
			},
			logout:        function () {
				return $injector.get( '$http' ).delete( Settings.api.measurements( '/token' ) );
			},
			// Request Interceptor
			request:       function ( config ) {
				if ( config.url.indexOf( Settings.api.measurements() ) !== -1 ) {
					// All API requests must pass along HTTP credentials
					config.withCredentials = true;

					// If we have a token, add it to the request
					if ( typeof token !== 'undefined' ) {
						config.headers['Authorization'] = 'Bearer ' + token;
					}

					config.attempts = ( typeof config.attempts === 'number' ) ? config.attempts + 1 : 1;
				}
				return config;
			},
			// Error Response Interceptor
			responseError: function ( response ) {
				if ( response.status === 401 && response.config.url.indexOf( Settings.api.measurements() ) !== -1 && response.config.attempts < 2 ) {
					var deferred = $q.defer();
					$injector.get( '$http' ).get( Settings.api.refresh, {withCredentials: true} ).then( function ( loginResponse ) {
						if ( loginResponse.data ) {
							//get new token
							startSession( loginResponse.data.service_ticket ).then( function () {
								//retry request with new token
								$injector.get( '$http' )( response.config ).then( function ( response ) {
									deferred.resolve( response );
								}, function ( response ) {
									deferred.reject();
								} );
							}, function() {
								$location.path('/error/invalid_session');
							} );
						} else {
							deferred.reject();
						}
					}, function ( response ) {
						deferred.reject();
						$location.path('/error/invalid_session');
					} );
					return deferred.promise;
				}
				return $q.reject( response );
			}
		}
	}

	angular.module( 'gma.services.measurements' ).factory( 'Session', Session );
})();
