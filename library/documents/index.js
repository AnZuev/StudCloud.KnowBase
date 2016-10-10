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