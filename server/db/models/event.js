'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	name: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: true
		// default:
	},
	location: {
		coordinates: {
			type: [Number],
			index: '2dsphere'
		}
	},
	budget: {
		type: Number		
	},
});

mongoose.model('Event', schema);
