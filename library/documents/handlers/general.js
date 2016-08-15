'use strict';

const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;

let Document = require("./model");
const Util = require('util');
const logger = require('../../libs/logger').getLogger();


/**
 * @memberof module:BZ~Document
 * @function addDocument
 * @static
 * @private
 * @param document - документ
 * @property title {String} - название
 * @property author {Mongoose.Types.ObjectId} - id автора
 * @property search
 * @property parts
 */
Document.statics.addDocument = function*(document){
	try{
		document.parts.forEach(function(element, index){
			document.parts[index].serialNumber = index;
		});
	}catch(e){
		document.parts = [];
	}


	var newDoc = new this({
		title: document.title,
		author: document.author,
		search: document.search,
		parts: document.parts
	});
	yield* newDoc.saveDoc();
};


/**
 * @memberof module:BZ~Document
 * @function remove Document
 * @static
 * @private
 * @param documentId - id документа
 * @param userId - кто удаляет
 * @property title {String} - название
 * @property author {Mongoose.Types.ObjectId} - id автора
 * @property search
 * @property parts
 */
Document.statics.removeDocument = function*(documentId, userId){
	let promise = this.update(
		{
			_id:documentId,
			author: userId
		},
		{
			enabled: false,
			toDelete: true
		});
	let errCounter = 5;
	while(errCounter > 0){
		try{
			yield promiseToRemove(promise);
			break;
		}catch(err){
			if(err instanceof ValidationError){
				logger.info(err);
				break;
			}else{
				logger.error(err);
			}
		}
		errCounter--;
	}
};

function promiseToRemove(promise){
	return promise.then(function(result){
		if(result.n == 0){
			let err = new ValidationError(403,
				Util.format("Document with id = %s couldn't be deleted by user with id = %s", documentId, userId));
			throw err;
		}else if(result.nModified == 1){
			return true;
		}
	});
}
