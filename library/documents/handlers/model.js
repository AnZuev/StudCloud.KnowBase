'use strict';
const Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;
/**
 * @typedef {object} module:BZ~Comment
 * @property author {Mongoose.Types.ObjectId} - отправитель
 * @property created {Date} - дата создания
 * @property text {String} - текст комментария
 * @property "_id" {Mongoose.Types.ObjectId} - id комментария
 */

/**
 * @typedef {object} module:BZ~Part
 * @property url {String} - строка для скачивания
 * @property serialNumber {Number} - порядковый номер файла
 * @property _id {Mongoose.Types.ObjectId} - идентификатор части
 */

/**
 * @class module:BZ~Document
 * @classDesc Класс, представляющий сущность document
 * @property title {String} - Название
 * @property author {Mongoose.Types.ObjectId} - Автор
 * @property created {Date} - Дата создания
 * @property social {object} - Объект соц информации
 * @property social.downloads {Mongoose.Types.ObjectId[]} кто скачал
 * @property social.watches {Number} - количество просмотров
 * @property social.likes {Mongoose.Types.ObjectId[]} кому понравилось
 * @property social.dislikes {Mongoose.Types.ObjectId[]} кому не понравилось
 * @property social.comments {module:BZ~Comment[]} - массив комментариев
 * @property socila.rating {Number} - рейтинг
 * @property parts {module:BZ~Part[]} - массив частей
 * @property enabled {boolean} - доступен ли для поиска
 * @property toDelete {boolean} - нужно ли удалять документ
 * @property updated {Date} - дата обновления
 * @property search {object} - объект с данными для поиска
 * @property search.universities {Mongoose.Types.ObjectId[]} - массив id универов, которым подходит данная работа
 * @property search.faculties {Mongoose.Types.ObjectId[]} - массив id факультетов, которым подходит данная работа
 * @property search.year {number[]} - массив курсов, которым подходит данная работа
 * @property search.subject {Mongoose.Types.ObjectId} - id предмета работы(Subject)
 * @property search.cType {Mongoose.Types.ObjectId} - id типа работы(WorkType)
 */
let Document = new Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: Schema.Types.ObjectId,
		required: true
	},
	created:{
		type: Date,
		default: Date.now()
	},
	social:{
		downloads:[Schema.Types.ObjectId],
		watches: {
			type: Number,
			default:0
		},
		likes:[Schema.Types.ObjectId],
		dislikes:[Schema.Types.ObjectId],
		comments:[
			{
				author: {
					type: Schema.Types.ObjectId,
					required: true
				},
				created:{
					type: Date,
					default: Date.now()
				},
				text: String
			}
		],
		rating:{
			type: Number,
			default: 0
		}
	},
	search:{
		universities:[Schema.Types.ObjectId], // id универов, в которых встречалась данная работа
		faculties: [Schema.Types.ObjectId], // id факультетов, в которых встречалась данная работа
		year: [Number], // курс
		subject: Schema.Types.ObjectId, // id предмета
		cType: Schema.Types.ObjectId //лаба, курсовая и тд
	},
	parts:[
		{
			url: String, // ссылка на файл для скачивания
			serialNumber: Number // номер файла в данной работе(1, 2 и тд)
		}
	],
	enabled: {
		type: Boolean,
		default: true
	},
	toDelete:{
		type: Boolean,
		default: false
	},
	updated:{
		type: Date,
		default: Date.now()
	}
});

module.exports = Document;