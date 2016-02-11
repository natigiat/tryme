var mongoose =require('mongoose');
var bcrypt  = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');




var MessagesSchema = mongoose.Schema({
	name: {type : String},
	publisher: {type : String },
	time : { type : Date, default: Date.now },
});

MessagesSchema.plugin(uniqueValidator);


var Messages = module.exports = mongoose.model('Messages' , MessagesSchema);

module.exports.getAllMessages = function(id , callback){
	var query = {userId : id};
	Messages.find(query , callback);
}


module.exports.insertMessages = function(id , callback){
	var query = {userId : id};
	Messages.find(query , callback);
}





