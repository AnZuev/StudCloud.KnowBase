'use strict';
const logger = require('../../libs/logger').getLogger();
let Document = require('./model');
const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;
/**
 * @memberof module:BZ~Document
 * @returns {Document}
 * @throws {DbError}, code = 500 - ошибка базы данных
 * @functionType generator
 * @function saveDoc
 * @instance
 */
Document.methods.saveDoc = function*(){
	let errCounter = 5;
	let doc;
	this.updateDate();
	while(errCounter > 0){
		try{
			doc = yield this.save();
			break;
		}catch(err){
			errCounter--;
			logger.error(new DbError(err, 500, 'Ошибка при сохранении документа, колличество ошибок - %d', 5 - errCounter));
		}
	}
	return doc;
};


Document.methods.updateDate = function(){
	this.updated = new Date();
};


