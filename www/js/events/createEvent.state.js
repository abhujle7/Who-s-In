app.config(function($stateProvider) {		
	$stateProvider		
	.state('app.tab.chat-createNewEvent', {		
		url: '/chat/:id/createNewEvent',		
		cache: false,		
		views: {		
			'roomsView': {		
				cache: false,		
				templateUrl: 'js/events/createNewEvent.html',		
				controller: 'EventsCtrl'		
			}		
		},		
		resolve: {		
			// groupDetails: function ($stateParams, RoomsFactory) {		
			// 	return RoomsFactory.get($stateParams.id)		
			// }		
			rooms: function(RoomsFactory) {		
        		return null;		
      		},		
			 events: function() {		
        		return null;		
      		},
      		roomIds: function() {
        		return null;
      		},
      		userSpecificEvents: function(EventFactory) {
        		return null;
      		}		
		}		
	})		
})