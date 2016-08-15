/**
 * @module BZ
 */

const DbError = require('@anzuev/studcloud.errors').DbError;
const ValidationError = require('@anzuev/studcloud.errors').ValidationError;
/**
 * @class module:BZ~BZ
 * @classdesc Класс, представляющий собой прослойку между моделью Document и приложениями, использующими API модели
 */
class BZ{
	/**
	 * Настройка модуля
	 * @function configure
	 * @param {nconf} config - конфигурация
	 * @return {void}
	 * @memberOf module:BZ~BZ
	 */
	static configure(config){
		require('./library/libs/connections').configure(config);
		require('./library/libs/logger').configure(config);
		this._model = require('./library/libs/connections').getConnections().model('Document', require('./library/documents'));
	};

	/**
	 * Получение модели документов
	 * @function getModel
	 * @memberOf module:BZ~BZ
	 * @returns {Mongoose.Model}
	 */
	static getModel(){
		if(!this._model){
			throw new ValidationError(500, "BZ module hasn't been configured yet;");
		}
		return this._model;
	}
}




module.exports = BZ;