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

/**
 * @memberof module:BZ~Document
 * @param UAMS - объект модуля UAMS
 * @function formatToSearch
 * @param WT - объект модели worktype, (RDS.getWorkTypeModel());
 * @param userId - для кого форматируется документ(нужен для проставки liked и disliked)
 * @functionType - generator
 * @returns {{title: *, author: {username: string, id: (blogpost.author|{type, ref}|exports|module.exports|module:BZ~Document.author|{type, required}|*)}, likes: {liked, amount: Number}, dislikes: {disliked, amount: Number}, rating: Number, type: {id: *, title: *}, watches: (*|number), id: *, description: *}}
 * <pre>
 *
 *     {
 *          title: 'Первый документ',
            author: {
                username: 'Антон Зуев',
                id: 577aa958445338a73b232aff
            },
            likes: {
                liked: true,
                amount: 2
            },
            dislikes: {
                disliked: false,
                amount: 0
            },
            rating: 2,
            type: {
                id: 575195b2165f1e79574c71ff,
                title: 'Курсовая работа'
            },
            watches: 0,
            id: 56fe9c4ca960bcce0e74871f,
            description: "Описание документа"
       }

      // пример использования
        yield* res.formatToSearch(UAMS, RDS.getWorkTypeModel(), '56fe9c4ca960bcce0e74871f');

 </pre>


 */
Document.methods.formatToSearch = function*(UAMS, WT, userId){
	let author = yield* UAMS.getUserById(this.author);
	let wt = yield WT.getById(this.search.cType);

	return {
		title: this.title,
		author: {
			username: author.pubInform.name + " " + author.pubInform.surname,
			id: this.author
		},
		likes: {
			liked: this.social.likes.findInArray(userId),
			amount: this.social.likes.length
		},
		dislikes:{
			disliked: this.social.dislikes.findInArray(userId),
			amount: this.social.dislikes.length
		},
		rating: this.social.downloads.length,
		type: {
			id: wt._id,
			title: wt.title
		},
		watches: this.social.watches.length || 0,
		id: this._id,
		description: this.description
	};
};


