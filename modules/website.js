var mongoose =require('mongoose');
var bcrypt  = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');




var SiteSchema = mongoose.Schema({
	userId: { type: String , required: true},
	name: {type : String},
	url: {type : String },
	active: {type : Boolean},
	time : { type : Date, default: Date.now },
});

SiteSchema.plugin(uniqueValidator);


var Site = module.exports = mongoose.model('Site' , SiteSchema);

module.exports.getAllSite = function(id , callback){
	var query = {userId : id};
	Site.find(query , callback);
}



