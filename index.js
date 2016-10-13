'use strict';
var reporterName = require('./get-reporter-name');

module.exports = require('mocha').reporters[reporterName] || require(reporterName);
