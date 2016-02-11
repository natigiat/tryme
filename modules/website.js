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

module.exports.countUserWebsite = function(id , callback){
	var query = {userId : id};
	Site.count(query , callback);
}

module.exports.removeWebsite = function(userId , url , callback){
	var query = {userId : id,  url:url};
	Site.remove(query, callback);

}

module.exports.getSiteByUserIdAndSiteName = function(id , sitename , callback){
	
	var query = {userId : id,  name:sitename};
	Site.find(query , callback).limit(1);

}



