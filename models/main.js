var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		Schema = mongoose.Schema;

var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: {type: String, default: 'User'},
	date: {type: Date, default: Date.now},
});

var newsSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	photos: [String],
	date: {type: Date, default: Date.now}
});

var exhibitionSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	interval: {
		start: Date,
		end: Date
	},
	date: {type: Date, default: Date.now}
});

var eventSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	meta: {
		hall: { type: String, trim: true, locale: true },
		age: { type: String, trim: true, locale: true },
	},
	exhibition: { type: Schema.Types.ObjectId, ref: 'Exhibition' },
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	schedule: [Date],
	date: {type: Date, default: Date.now}
});

var categorySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	date: {type: Date, default: Date.now}
});


// ------------------------
// *** Plugins Block ***
// ------------------------


newsSchema.plugin(mongooseLocale);
exhibitionSchema.plugin(mongooseLocale);
eventSchema.plugin(mongooseLocale);
categorySchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.News = mongoose.model('News', newsSchema);
module.exports.Exhibition = mongoose.model('Exhibition', exhibitionSchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.Category = mongoose.model('Category', categorySchema);