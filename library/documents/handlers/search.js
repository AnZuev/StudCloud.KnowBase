"use strict";

const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;

const Util = require('util');
const logger = require('../../libs/logger').getLogger();
let Document = require("./model");
const Mongoose = require('mongoose');

/**
 * Получение документа по id
 * @function getById
 * @memberOf module:BZ~Document
 * @param id{Mongoose.Types.ObjectId} - id документа для получения
 * @returns {Promise|Promise.<T>}
 * @fulfill document{module:BZ~Document || null} - документ либо null
 * @reject error {DbError}, code = 500 - какая-то ошибка базы данных
 * @private
 */
Document.statics.getById = function(id){
	let promise = this.findById(id).exec();
	return promise.then(function(document){
		if(document){
			return document;
		}else{
			return null;
		}
	}).catch(function(err){
		throw new DbError(err, 500, Util.format("Error while saving document with id = %s", id));
	})
};


/**
 * Получение документов по названию и контексту
 * @function getDocumentsBy
 * @memberOf module:BZ~Document
 * @param title {String} - название
 * @param context {Object} - контекст
 * @param context.university {Mongoose.Types.ObjectId} - id университета
 * @param context.faculty {Mongoose.Types.ObjectId} - id факультета
 * @param context.subject {Mongoose.Types.ObjectId} - id предмета
 * @param context.type {Mongoose.Types.ObjectId} - id типа
 * @param context.year {Number} - курс(номер)
 * @param page - сколько страниц пропустить
 * @returns {Promise|Promise.<T>}
 * @example
 * <pre>
 *     Выход - массив из документов
 *     Перед отдачей пользователю нужно у каждого документа вызвать document.formatToSearch
 *    </pre>
 */
Document.statics.getDocumentsBy = function(title, context, page){
	page = page || 0;
	Document = this;
	context = validateContext(context);
	if(title){
		context["title"] = new RegExp("^" + title, 'ig');
	}
	let match = {
		$match: context
	};

	let limit = {
		$limit: 20
	};
	let sort = {
		$sort: {"rating": 1}
	};

	let skip = {
		$skip: page * 20
	};
	let promise = this.aggregate([match, format, sort, skip, limit]).exec();
	return promise
		.then(function(documents){
			return documents;
		}).catch(function(err){
			throw err;
		})
};



/**
 * @param rawContext
 * @returns {{}}
 */
function validateContext(rawContext){
	var context ={};
	for(let key in rawContext){
		switch (key){
			case "university":
				context["search.universities"]=  Mongoose.Types.ObjectId(rawContext[key]);
				break;
			case "faculty":
				context["search.faculties"] =  Mongoose.Types.ObjectId(rawContext[key]);
				break;
			case "year":
				context["search.year"] = rawContext[key];
				break;
			case "subject":
				context["search.subject"]=  Mongoose.Types.ObjectId(rawContext[key]);
				break;
			case "type":
				context["search.cType"] =  Mongoose.Types.ObjectId(rawContext[key]);
				break;
		}
	}
	return context;
}


Array.prototype.findInArray = function(elem){
	for(let i = 0; i < this.length; i++){
		if(elem.toString() == this[i].toString()){
			return true;
		}
	}
	return false;
}