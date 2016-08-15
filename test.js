"use strict";


require('./library/libs/connections').configure(require('./config'));
require('./library/libs/logger').configure(require('./config'));

let Q = require("q");
let Document = require('./library/documents');

/**
 * @type module:BZ~Document
 */
Document = require('./library/libs/connections').getConnections().model('Document', Document);
/*let pr = Document.getDocumentsBy("П", {});
pr.then(function(docs){
	console.log(docs);
}).catch(function(err){
	console.log(err);
});*/


Q.async(function*(){
	try{
		//let doc = yield* Document.addComment('56fe9c4ca960bcce0e74871f', {text: "test1", authorId: "575f1e72639c4dfa0917c2b7"});

		let res = yield Document.getDocumentsBy('П', {});
		console.log(res);
		//console.log(doc.isAllowToUpdate('56dc4ecc380e1b4e768fe12e'));
	}catch(err){
		throw err;
	}
})().done();

