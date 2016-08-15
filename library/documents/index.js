'use strict';
let mongoose = require('mongoose'),
	Schema = mongoose.Schema;



let document = require('./handlers/model');


require('./handlers/libs');

require("./handlers/general");

require("./handlers/content");

require("./handlers/search");

require("./handlers/social");

module.exports = document;
/*
/!* social part starts *!/

document.statics.addLike = require('./handlers/social').addLike;

document.statics.addDislike = require('./handlers/social').addDislike;

document.statics.addWatch = require('./handlers/social').addWatch;

document.statics.addComment = require('./handlers/social').addComment;

document.statics.getComments = require('./handlers/social').getComments;

document.statics.addDownload = require('./handlers/social').addDownload;



/!* social part ends *!/



/!* content part starts *!/

document.statics.addPart = require('./handlers/content').addPart;

document.statics.removePart = require('./handlers/content').removePart;

/!* content part ends *!/



/!* search part starts *!/

document.statics.getDocById = require('./handlers/search').getDocById;

document.statics.getDocsBy = require('./handlers/search').getDocsBy;

document.statics.getComments = require('./handlers/social').getComments;


/!* search part ends *!/








*/

