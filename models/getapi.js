var mongoose = require('mongoose');

// api schema
var getapiSchema = mongoose.Schema({
	Access_Token: {
		type: String,
		require: true
	},
	Refresh_Token: {
		type: String,
		require: true
	},
	Character_ID: {
		type: String,
		require: true
	},
	Character_Name: {
		type: String,
		require: true
	}

});

var Api = module.exports = mongoose.model('api', getapiSchema, 'Api');

// get api
module.exports.getApi = function (callback) {
	Api.find(callback);
};

// add api
module.exports.addApi = function (apis, callback) {
	Api.create(apis, callback);
};


// update api
module.exports.updateApi = function (id, at, callback) {
	Api.findById(id, function (err, api) {
		if (err) return handleError(err);
		api.Access_Token = at;
		api.save();
	});
};
