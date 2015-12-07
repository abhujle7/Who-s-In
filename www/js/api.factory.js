app.factory('ApiFactory', function() {
	var event = {};
	return {
		set: function(name, location, time) {
			event.name = name;
			event.location = location;
			if (time) {
				event.date = moment(time).format('L hh:mm a')
				console.log(event.date)
				// event.time = moment(time).format('hh:mm a')
			}
			else {
				event.date = null;
				event.time = null;
			}
		},
		get: function() {
			console.log(event)
			return event;
		}
	}
})