﻿define( ['gcmApp', 'angular'], function ( gcmApp ) {
	gcmApp.factory( 'churchService', ['$resource', '$rootScope', function ( $resource, $rootScope ) {
		return $resource( $rootScope.GCM_APP.api_url + '/churches/:church_id', {}, {
			getChurch:   {method: 'GET'},
			getChurches: {method: 'GET', isArray: true},
			addChurch:   {method: 'POST'},
			saveChurch:  {method: 'PUT'}
		} );
	}] );
	gcmApp.factory( 'church_service', ['$http', function ( $http ) {
		return {
			getChurches: function ( session_ticket, bounds, extras ) {
				var apiResourceUrl = _api_url + "/churches" + "?token=" + session_ticket + extras;
				if ( bounds ) {
					var sw = bounds.getSouthWest();
					var ne = bounds.getNorthEast();
					apiResourceUrl = _api_url + "/churches" + "?token=" + session_ticket + "&lat_min=" + sw.lat() + "&lat_max=" + ne.lat() + "&long_min=" + sw.lng() + "&long_max=" + ne.lng() + extras;
				}
				return $http.get( apiResourceUrl, {withCredentials: true} )
					.then( function ( response ) {
						return response.data;
					} );
			},
			addChurch:   function ( session_ticket, church ) {
				return $http.post( _api_url + "/churches" + "?token=" + session_ticket, church, {withCredentials: true} )
					.then( function ( response ) {
						return response.data;
					} );
			},
			saveChurch:  function ( session_ticket, church ) {
				return $http.put( _api_url + "/churches/" + church.id + "?token=" + session_ticket, church, {withCredentials: true} )
					.then( function ( response ) {
						return response.data;
					} );
			}
		};
	}] );
} );
