﻿(function ( angular ) {
	'use strict';

	function GMACtrl( $scope, $filter, $location, $modal, Session, Ministries, Assignments, Settings, $log, GoogleAnalytics, UserPreference, growl, Languages, gettextCatalog, gettext ) {
		// Attach $location provider to scope, this is used to set active tabs
		$scope.$location = $location;
		$scope.mobileApps = Settings.mobileApps;
		$scope.tabs = Settings.tabs;
		$scope.langFlagClass = 'flag-us'; //used to show language flag indicator
		// always redirect user to map tab when init
		$location.path( '/map' ).replace();

		$scope.appEnvironment = Settings.appEnvironment;
		$scope.appName = Settings.name;
		$scope.appVersion = Settings.version;
		//---------------------------------------
		// Assignments
		//---------------------------------------

		$scope.$on( 'sessionStart', function ( event, session ) {
			if ( typeof session.assignments === 'undefined' || session.assignments.length == 0 ) {
				//Open Modal if user has no assignment
				$scope.joinMinistry( false );
			}
		} );

		// Update current assignment when assignments is set - this occurs after a session is established
		$scope.$watch( 'current.assignments', function ( assignments, oldVal ) {
			if ( assignments === oldVal ) return;

			$log.debug( 'Assignments Changed' );

			//first time when page loads
			if ( typeof assignments === 'object' && typeof oldVal === 'undefined' ) {
				var min_choice = false;
				if ( $scope.current.hasOwnProperty( 'user_preferences' ) && typeof $scope.current.user_preferences !== 'undefined' ) {
					var flat_assignments = UserPreference.getFlatMinistry( assignments );
					//apply user preference
					var found_assignment = _.find( flat_assignments, function ( ministry ) {
						return (ministry.ministry_id === $scope.current.user_preferences.preferred_ministry);
					} );

					if ( typeof found_assignment !== 'undefined' && typeof found_assignment !== '' ) {
						min_choice = found_assignment;
					} else {
						min_choice = $filter( 'orderBy' )( assignments, 'name' )[0];

					}
				} else {
					//load first ministry if user preferences not found
					min_choice = $filter( 'orderBy' )( assignments, 'name' )[0];

				}
				//redirect user to his home tab
				if ( min_choice !== false ) {
					if ( _.contains( ['admin', 'inherited_admin', 'leader', 'inherited_leader', 'member'], min_choice.team_role ) ) {
						$location.path( '/news' ).replace();
						var deRegister = $scope.$on( '$routeChangeSuccess', function () {
							if ( min_choice === false ) return;
							$scope.current.assignment = min_choice;
							min_choice = false;
							deRegister();
						} );
					} else {
						$scope.current.assignment = min_choice;
					}
				}
				$scope.current.ministries = flattenMinistries( assignments );

			} else if ( typeof assignments === 'object' ) {
				if ( angular.isUndefined( $scope.current.assignment ) || !_.contains( _.pluck( assignments, 'id' ), $scope.current.assignment.id ) ) {

					$scope.current.assignment = $filter( 'orderBy' )( assignments, 'name' )[0];

				}
				$scope.current.ministries = flattenMinistries( assignments );
			} else {
				delete $scope.current.assignment;
				$scope.current.ministries = [];
			}

		} );

		// Update assignment and mcc when assignment changes
		$scope.$watch( 'current.assignment', function ( assignment, oldVal ) {
			if ( assignment === oldVal ) return;

			$log.debug( 'Assignment Changed: ' + assignment.name );

			if ( typeof assignment === 'object' ) {

				if ( assignment.mccs.length > 0 ) {
					//check if first time
					if ( typeof oldVal === 'undefined' ) {
						if ( $scope.current.hasOwnProperty( 'user_preferences' ) && typeof $scope.current.user_preferences !== 'undefined' ) {
							//apply user preference here
							var user_mcc = _.find( assignment.mccs, function ( mcc ) {
								return (mcc === $scope.current.user_preferences.preferred_mcc);
							} );

							if ( typeof user_mcc !== 'undefined' && user_mcc !== '' ) {
								$scope.current.mcc = user_mcc;

							} else {
								//check for admin preferences
								var admin_mcc = _.find( assignment.mccs, function ( mcc ) {
									return (mcc === $scope.current.assignment.default_mcc);
								} );
								if ( typeof admin_mcc !== 'undefined' && admin_mcc !== '' ) {
									$scope.current.mcc = admin_mcc;
								} else {
									//if admin preferences not found then use fist one
									$scope.current.mcc = $filter( 'orderBy' )( assignment.mccs, $scope.mccSort )[0];
								}
							}

						} else {
							// Set mcc if none is currently set or new assignment does not include current mcc
							if ( typeof $scope.current.mcc === 'undefined' || assignment.mccs.indexOf( $scope.current.mcc ) < 0 ) {
								$scope.current.mcc = $filter( 'orderBy' )( assignment.mccs, $scope.mccSort )[0];
							}
						}
					} else {
						// Set mcc if none is currently set or new assignment does not include current mcc
						if ( typeof $scope.current.mcc === 'undefined' || assignment.mccs.indexOf( $scope.current.mcc ) < 0 ) {
							$scope.current.mcc = $filter( 'orderBy' )( assignment.mccs, $scope.mccSort )[0];
						}
					}

				}
				else {
					// Delete current mcc if assignment has no mccs
					delete $scope.current.mcc;
				}
			}
		} );

		/**
		 * Deep watch for mccs array
		 */
		$scope.$watch( 'current.assignment.mccs', function ( mccs, oldVal ) {
			if ( mccs !== undefined && mccs.length !== 0 ) {
				if ( typeof $scope.current.mcc === 'undefined' || mccs.indexOf( $scope.current.mcc ) < 0 ) {
					$scope.current.mcc = $filter( 'orderBy' )( mccs, $scope.mccSort )[0];
				}
			} else {
				delete $scope.current.mcc;
			}
		}, true );

		$scope.current.hasRole = function ( role ) {
			if ( typeof $scope.current.assignment === 'undefined' || typeof $scope.current.assignment.team_role === 'undefined' ) return false;
			return (typeof role === 'string') ? role == $scope.current.assignment.team_role : _.contains( role, $scope.current.assignment.team_role );
		};

		function flattenMinistries( arr ) {
			var ministries = [];
			angular.forEach( arr, function ( ministry ) {
				ministries.push( ministry );
				if ( ministry.hasOwnProperty( 'sub_ministries' ) && typeof ministry.sub_ministries === 'object' ) {
					ministries = ministries.concat( flattenMinistries( ministry.sub_ministries ) );
				}
			} );

			//sort by team role
			ministries = _.sortBy( ministries, function ( m ) {
				return (m.team_role === 'leader' ? 0 : 1);
			} );
			//remove duplicates
			return _.uniq( ministries, false, function ( m ) {
				return m.ministry_id;
			} );
		}

		//---------------------------------------
		// Mission Critical Components (MCC)
		//---------------------------------------

		// MCC labels, this should be done in localization in the future.
		$scope.mccLabels = {
			/// MCC - Digital Strategies
			ds: gettext( 'Digital Strategies' ),

			/// MCC - Global Church Movements
			gcm: gettext( 'Global Church Movements' ),

			/// MCC - Leader Led
			llm: gettext( 'Leader Led' ),

			/// MCC - Student Led
			slm: gettext( 'Student Led' )
		};

		$scope.mccSort = function ( value ) {
			return $scope.mccLabels[value];
		};

		//---------------------------------------
		// Periods
		//---------------------------------------
		var periods = [], now = moment().date( 1 );
		for ( var i = 0; i < 12; i++ ) {
			periods.push( now.clone() );
			now.subtract( 1, 'M' );
		}
		$scope.periods = periods;
		$scope.current.period = periods[0];

		$scope.prevPeriod = function () {
			var index = $scope.periods.indexOf( $scope.current.period );
			index = ( ( index + 1 ) >= $scope.periods.length ) ? 0 : index + 1;
			$scope.current.period = $scope.periods[index];
		};

		$scope.nextPeriod = function () {
			var index = $scope.periods.indexOf( $scope.current.period );
			index = ( ( index - 1 ) < 0 ) ? $scope.periods.length - 1 : index - 1;
			$scope.current.period = $scope.periods[index];
		};

		//---------------------------------------
		// Session
		//---------------------------------------

		$scope.logout = function () {
			Session.logout().then( function () {
				window.location = Settings.api.logout;
			} );
		};

		$scope.invalidateSession = function () {
			Session.logout();
		};

		$scope.joinMinistry = function ( allowClose ) {
			allowClose = typeof allowClose !== 'undefined' ? allowClose : true;

			var instance = $modal.open( {
				templateUrl: 'partials/join-ministry.html',
				controller:  'JoinMinistryCtrl',
				keyboard:    allowClose,
				backdrop:    allowClose ? true : 'static',
				resolve:     {
					'ministries': function () {
						return Ministries.getMinistries().$promise;
					},
					'allowClose': function () {
						return allowClose;
					}
				}
			} );

			instance.result.then( function ( data ) {

				Assignments.addTeamMember( {
					username:    $scope.current.user.cas_username,
					ministry_id: data.ministry.ministry_id,
					team_role:   'self_assigned'
				}, function ( assignment ) {
					if ( typeof $scope.current.assignments === 'undefined' || $scope.current.assignments === [] ) {
						// If assignments is empty, setting the array will also set the current assignment
						$scope.current.assignments = [assignment];

						//Also updating supported staff setting in user preference
						UserPreference.savePreference( data.user_preference )
							.success( function () {
								if ( typeof $scope.current.user_preferences === 'undefined' ) {
									$scope.current.user_preferences = {};
								}

								$scope.current.user_preferences.supported_staff = data.user_preference.supported_staff;
							} );
					}
					else {
						// Add new assignment
						$scope.current.assignments.push( assignment );

						// Set new assignment as current
						$scope.current.assignment = assignment;
					}

					// Google Analytics
					GoogleAnalytics.event( 'assignments', 'join ministry', (function () {
						var dimensions = {};
						dimensions[GoogleAnalytics.DIM.guid] = $scope.current.user.key_guid;
						dimensions[GoogleAnalytics.DIM.ministry_id] = assignment.ministry_id;
						return dimensions;
					})() );
				}, function ( e ) {
					if ( e.status === 400 ) {
						growl.error( gettextCatalog.getString( 'You are already assigned to requested ministry' ) );
					} else {
						growl.error( gettextCatalog.getString( 'Unable to join to requested ministry' ) );
					}
				} );
			} );
			scrollToTop();
		};

		$scope.onError = function ( response, code ) {
			$location.path( '/error' );
		};

		function scrollToTop() {
			window.setTimeout( function () {
				window.parent.scrollTo( 0, 0 );
			}, 10 );
		}

		//---------------------------------------
		// User Preferences Dialog
		//---------------------------------------

		$scope.showUserPreference = function () {

			$modal.open( {
				templateUrl: 'partials/preference/user-preference-modal.html',
				controller:  'UserPreferenceCtrl',
				keyboard:    true,
				backdrop:    true,
				size:        'model-lg',
				resolve:     {
					modelData: function () {
						return {
							mccLabels: angular.copy( $scope.mccLabels )
						}
					}
				}
			} );

			scrollToTop();
		};

		/**
		 * Watches for changes to static_locale
		 * - update gettext language
		 * - load external language JSON
		 * - update language flag indicator css class
		 */
		$scope.$watch( 'current.user_preferences.static_locale', function ( locale, oldLocale ) {
			if ( typeof locale === 'undefined' || locale === '' ) return;

			var intLocale = locale.replace( '-', '_' );

            var loadLanguage = function (locale, i) {
                var fallback = i != -1 ? locale.substring(0, i) : locale;
                gettextCatalog.loadRemote('languages/' + fallback + '.json')
                    .then(function (response) {
                        gettextCatalog.setStrings(intLocale, response.data[fallback.replace('-', '_')]);

                        if (i != -1) {
                            loadLanguage(locale, locale.indexOf('-', i + 1));
                        } else {
                            //set css class to show language flag on top
                            $scope.langFlagClass = 'flag-' + locale.split('-')[1].toLowerCase();
                            //set current language, match with json file object name
                            gettextCatalog.setCurrentLanguage(intLocale);
                        }
                    }, function (e) {
                        if (i != -1) {
                            loadLanguage(locale, locale.indexOf('-', i + 1));
                        } else {
                            //set css class to show language flag on top
                            $scope.langFlagClass = 'flag-' + locale.split('-')[1].toLowerCase();
                            //set current language, match with json file object name
                            gettextCatalog.setCurrentLanguage(intLocale);
                        }
                    });
            };
			loadLanguage( locale, locale.indexOf( '-' ) );
		} );

		/**
		 * Sends true to show, false to hide
		 * @param tab
		 * @returns {boolean}
		 */
		$scope.tabFilter = function ( tab ) {
			//current may not be defined, so hide un-till user get an assignment
			if ( typeof $scope.current === 'undefined' ) return false;
			//check for role first
			if ( !$scope.current.hasRole( tab.requiredRoles ) ) {
				return false;
			}

			if ( tab.path == '/reports' ) {
				//user preferences not found
				if ( typeof $scope.current.user_preferences === 'undefined' ) {
					//send admin preferences
					return ($scope.current.hide_reports_tab != '1');
				}
				//lastly send user preferences
				return ($scope.current.user_preferences.hide_reports_tab !== '1');
			} else if ( tab.path == '/measurements' ) {
				//if current ministry has no mcc then hide the tab
				return (typeof $scope.current.mcc !== 'undefined');
			} else {
				return true;
			}

		};

		$scope.$on( '$locationChangeStart', function ( event, next, current ) {
			if ( $scope.current.assignment === undefined ) return true;
			//get tab name
			var nextRoutePath = next.split( '#/' )[1];
			//get required role for requested tab
			var foundTab = _.findWhere( $scope.tabs, {path: '/' + nextRoutePath} );

			//check if user has permission to load this tab
			if ( typeof foundTab !== 'undefined' && !$scope.current.hasRole( foundTab.requiredRoles ) ) {
				growl.error( gettextCatalog.getString( 'You are not authorised for this' ) );
				event.preventDefault();
				return false;
			}
		} );

		$scope.current.redirectToHomeTab = function () {

			if ( $scope.current.hasRole( ['admin', 'inherited_admin', 'leader', 'inherited_leader'] ) ) {
				$location.path( '/news' ).replace();
			} else {
				$location.path( '/map' ).replace();
			}
		};

		$scope.current.canAccessCurrentTab = function () {
			if ( typeof $scope.current.assignment === 'undefined' ) {
				return false;
			}

			return ($scope.current.hasRole( _.findWhere( $scope.tabs, {path: $location.path()} ).requiredRoles ));

		};


		$scope.current.loadLanguages = function () {

			if ( typeof $scope.current.langList !== 'undefined' && $scope.current.langList.length !== 0 ) {
				return $scope.current.langList;
			} else {

				Languages.getLanguages()
					.success( function ( response ) {
						$scope.current.langList = _.sortBy( response, 'english_name' );
						return $scope.current.langList;
					} )
					.error( function () {
						growl.error( gettextCatalog.getString( 'Unable to load languages' ) );
						return false;
					} );
			}
		}

	}

	angular.module( 'gma.controllers' ).controller( 'GMACtrl', GMACtrl );
})( angular );
