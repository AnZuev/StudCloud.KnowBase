"use strict";

const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;

const Util = require('util');
const logger = require('../../libs/logger').getLogger();


let Document = require("./model");
const Mongoose = require('mongoose');


/**
 * Метод для добавления like к документу.
 * @function addLike
 * @memberOf module:BZ~Document
 * @functionType generator
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @param {Mongoose.Types.ObjectId} userId - id пользователя
 * @returns {Boolean} result - true: лайк добавлен, false: лайк не добавлен(скорее всего уже был);
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 */

Document.statics.addLike = function*(documentId, userId){
	let promise = this.update(
		{_id:documentId},
		{
			$addToSet: {"social.likes": userId },
			$pull: {"social.dislikes": userId}
		}).exec();
	let errCounter = 5;
	while (true){
		try{
			let result = yield promise;
			if(result.n == 0){
				throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
			}else{
				return (result.nModified == 1)
			}
		}catch(err){
			logger.error(err);
			if(errCounter == 0){
				throw err;
			}
		}
		errCounter--;
	}
};



/**
 * Метод для добавления dislike к документу.
 * @function addDislike
 * @memberOf module:BZ~Document
 * @functionType generator
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @param {Mongoose.Types.ObjectId} userId - id пользователя
 * @returns {Boolean} result - true: дизлайк добавлен, false: дизлайк не добавлен(скорее всего уже был);
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 */

Document.statics.addDislike = function*(documentId, userId){
	let promise = this.update(
		{_id:documentId},
		{
			$addToSet: {"social.dislikes": userId },
			$pull: {"social.likes": userId}
		}).exec();
	let errCounter = 5;
	while (true){
		try{
			let result = yield promise;
			if(result.n == 0){
				throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
			}else{
				return (result.nModified == 1)
			}
		}catch(err){
			logger.error(err);
			if(err instanceof DbError){
				throw err;
			}
			if(errCounter == 0){
				throw err;
			}

		}
		errCounter--;
	}
};


/**
 * Метод для добавления просмотра к документу.
 * @function addWatch
 * @memberOf module:BZ~Document
 * @functionType generator
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @returns {Boolean} result - true: просмотр добавлен, false: просмотр не добавлен(скорее всего уже был);
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 */

Document.statics.addWatch = function*(documentId){
	let promise = this.update(
		{_id:documentId},
		{
			$inc: {"social.watches": 1 }
		}).exec();
	let errCounter = 5;
	while (true){
		try{
			let result = yield promise;
			if(result.n == 0){
				throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
			}else if(result.nModified == 1){
				return true;
			}else{
				throw new DbError(null, 500, Util.format("Adding watch to document with id = %s. n = %d, nModified = %d",
					documentId, result.n, result.nModified));
			}
		}catch(err){
			logger.error(err);
			if(err instanceof DbError){
				throw err;
			}
			if(errCounter == 0){
				throw err;
			}

		}
		errCounter--;
	}
};


/**
 * Метод для добавления скачивания к документу.
 * @function addDownload
 * @memberOf module:BZ~Document
 * @functionType generator
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @param {Mongoose.Types.ObjectId} userId - id пользователя
 * @returns {Boolean} result - true: скачивание добавлено, false: скачивание не добавлено(скорее всего уже было);
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 */

Document.statics.addDownload = function*(documentId, userId){
	let promise = this.update(
		{_id:documentId},
		{
			$addToSet: {"social.downloads": userId }
		}).exec();
	let errCounter = 5;
	while (true){
		try{
			let result = yield promise;
			if(result.n == 0){
				throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
			}else{
				return (result.nModified == 1)
			}
		}catch(err){
			logger.error(err);
			if(err instanceof DbError){
				throw err;
			}
			if(errCounter == 0){
				throw err;
			}

		}
		errCounter--;
	}
};


/**
 * Метод для добавления комментария к документу.
 * @function addComment
 * @memberOf module:BZ~Document
 * @functionType generator
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @param {Object} comment - объект комментария
 * @param {String} comment.text  - текст комментария
 * @param {Mongoose.Types.ObjectId} comment.author - id автора
 * @returns {Boolean} result - true: комментарий добавлен, false: что-то непонятное произошло
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 */

Document.statics.addComment = function*(documentId, comment){
	comment.created = new Date();

	let promise = this.update(
		{_id:documentId},
		{
			$push: {"social.comments": comment }
		}).exec();
	let errCounter = 5;
	while (true){
		try{
			let result = yield promise;
			if(result.n == 0){
				throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
			}else{
				return (result.nModified == 1)
			}
		}catch(err){
			logger.error(err);
			if(err instanceof DbError){
				throw err;
			}
			if(errCounter == 0){
				throw err;
			}
		}
		errCounter--;
	}
};


/**
 * Метод для добавления комментария к документу.
 * @function getComments
 * @memberOf module:BZ~Document
 * @param {Mongoose.Types.ObjectId} documentId - id документа
 * @param {Date} date - время последнего комментария
 * @returns {Promise}
 * @fulfill {Comment[]} result - массив комментариев
 * @throws {DbError}, code = 404 - Не найден документ по переданному id
 * @throws {DbError}, code = 500 - какая-то ошибка БД
 */


Document.statics.getComments = function(documentId, date){
	date = new Date(date);
	let promise = this.aggregate(
		{
			$match:{
				_id: Mongoose.Types.ObjectId(documentId)
			}
		},
		{
			$unwind: "$social.comments"
		},
		{
			$match:{
				"social.comments.created":{$lt:date}
			}
		},
		{
			$group:{
				_id: '$_id',
				comments: {'$push': '$social.comments'}
			}
		}).exec();
	return promise.then(function(result){
		if(result.length == 0){
			throw new DbError(null, 404, Util.format("No document found by id = %s", documentId));
		}
		return result[0].comments;
	}).catch(function(err){
		logger.error(err);
		if(err instanceof DbError){
			throw err;
		}
		throw new DbError(err, 500, Util.format("Something bad happened while getting comments. DocumentId = %s, date = %s",
			documentId, date));
	});

};
