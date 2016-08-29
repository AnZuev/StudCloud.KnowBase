"use strict";

const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;

const Util = require('util');
const logger = require('../../libs/logger').getLogger();
let Document = require("./model");


/**
 * @function addPart
 * @memberOf module:BZ~Document
 * @param newPart - новая часть
 * @property url - строка, по которой можно скачать часть
 * @this Document
 * @throws ValidationError, code = 204 - часть с таким урлом уже есть
 * @instance
 * @returns {void}
 */
Document.methods.addPart = function(newPart){
	for(let part of this.parts){
		if(part.url == newPart.url){
			throw new ValidationError(204, Util.format("Part with url '%s' already here", newPart.url));
		}
	}
	newPart.serialNumber = this.parts.length;
	this.parts.push(newPart);
};

/**
 * @function isAllowToUpdate
 * @memberOf module:BZ~Document
 * @param userId {Mongoose.Types.ObjectId} - id пользователя, который хочет менять что-либо
 * @returns {boolean}
 * @instance
 */
Document.methods.isAllowToUpdate = function(userId){
	return (this.author == userId);
};


/**
 * @function removePart
 * @memberOf module:BZ~Document
 * @param partId - id части для удаления
 * @this Document
 * @instance
 * @throws ValidationError, code = 404 - часть с таким id не найдена
 * @throws ValidationError, code = 400 - не передана partId
 * @return {boolean},true - все прошло хорошо
 */
Document.methods.removePart = function(partId){
	if(!partId) {
		throw new ValidationError(400, Util.format("Bad partId %s", partId));
	}
	let index = -1;
	for(let part of this.parts){
		if(part._id.toString() == partId.toString()){
			index = this.parts.indexOf(part);
			this.parts.splice(index, 1);
			break;
		}
	}
	if(index < 0){
		throw new ValidationError(404, Util.format("No part with id = %s exists", partId));
	}else{
		this.parts.forEach(function(part, tIndex, arr){
			arr[tIndex].serialNumber = tIndex;
		});
		return true;
	}
};



