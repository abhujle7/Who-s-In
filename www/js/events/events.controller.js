app.controller('EventsCtrl', function($scope, $state, EventFactory, RoomsFactory) {

	// var promise = EventFactory.all();
	$scope.rooms = RoomsFactory.all();
	$scope.events = EventFactory.all();
	// promise.then(function(eventList) {
	// 	$scope.events = eventList;
	// })

	$scope.data = {
		name: null,
		time: null,
		location: null,
		locationName: null,
		group_id: null
	};

	$scope.createEvent = function() {
		$state.go('tab.createNewEvent');
	}

	$scope.submitEvent = function() {
		console.log("sup");
		EventFactory.addEvent($scope.data)
		// if ($scope.data.group_id)
		// 	EventFactory.addCustomEvent($scope.data.name, $scope.data.time, $scope.data.location, $scope.data.locationName, $scope.data.group_id);
		// else
		// 	EventFactory.addFixedEvent($scope.data.name, $scope.data.time, $scope.data.location, $scope.data.locationName);
	}
 })

//needs to talk to the back