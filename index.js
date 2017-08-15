'use strict';
var reporterName = require('./get-reporter-name');
var builtInReporters = require('mocha').reporters;

module.exports = builtInReporters[reporterName] || require(reporterName);
