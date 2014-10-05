var mongoose = require('mongoose'),
			Schema = mongoose.Schema;

var userSchema = new Schema({
		login: String,
		password: String,
		email: String,
		status: {type: String, default: 'User'},
		date: {type: Date, default: Date.now},
});

var newsSchema = new Schema({
	title: {
		ru: String,
		en: String
	},
	s_title: {
		ru: String,
		en: String
	},
	description: {
		ru: String,
		en: String
	},
	category: String,
	photo: String,
	date: {type: Date, default: Date.now}
});

var eventSchema = new Schema({
	title: {
		ru: String,
		en: String
	},
	hall: {
		ru: String,
		en: String
	},
	description: {
		ru: String,
		en: String
	},
	age: {
		ru: String,
		en: String
	},
	category: String,
	schedule: [Date],
	date: {type: Date, default: Date.now}
});


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.News = mongoose.model('News', newsSchema);
module.exports.Event = mongoose.model('Event', eventSchema);