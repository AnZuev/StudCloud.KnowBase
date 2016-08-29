'use strict';

let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;


let documentsCon;


module.exports.configure = function(config){

	if(config.get("mongoose:BZUri")){
		documentsCon = mongoose.createConnection(config.get('mongoose:BZUri'), config.get('mongoose:BZOptions'));
	}else{
		throw new Error("Can't connect to documents collection. No mongoose:BZUri property specified");
	}

};

module.exports.getConnections = function(){
	if(!documentsCon) throw new Error('Connections have not been configured');
	return documentsCon;
};
