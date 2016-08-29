'use strict';

let log4js = require('log4js');
let isConfigured;

exports.configure = function(config){
	log4js.configure({
		appenders: [
			{ type: 'file', filename: config.get("logs:BZ:path") || './logs/BZ.log', category: config.get("logs:BZ:label") ||'BZ' },
			{ type: 'console' }
		]
	});
	isConfigured = true;

};

exports.getLogger = function(){
	if(!isConfigured){
		throw new Error('logger has not been configured');
	}else{
		return log4js.getLogger('BZ');
	}
};