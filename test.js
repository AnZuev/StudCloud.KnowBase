"use strict";


require('./library/libs/connections').configure(require('./config'));
require('./library/libs/logger').configure(require('./config'));

let Q = require("q");
const BZ = require("./index");
const Mongoose = require('mongoose');
const UAMS = require("@anzuev/studcloud.uams");
const RDS = require("@anzuev/studcloud.rds");

RDS.configure(require('./config'));
UAMS.configure(require('./config'));


/**
 * @type module:BZ~Document
 */
/*let pr = Document.getDocumentsBy("П", {});
pr.then(function(docs){
	console.log(docs);
}).catch(function(err){
	console.log(err);
});*/


BZ.configure(require('./config'));
Q.async(function*(){
	try{
		//let doc = yield* Document.addComment('56fe9c4ca960bcce0e74871f', {text: "test1", authorId: "575f1e72639c4dfa0917c2b7"});


		let Document = yield BZ.getModel();
		let res = yield Document.getById('56fe9c4ca960bcce0e74871f');

	    //console.log(res);
		let a = yield* res.formatToSearch(UAMS, RDS.getWorkTypeModel(), '56fe9c4ca960bcce0e74871f');

		console.log(a);
		//console.log(doc.isAllowToUpdate('56dc4ecc380e1b4e768fe12e'));
	}catch(err){
		throw err;
	}
})().done();

