'use strict';

var childProcess = require('child_process');
var path = require('path');
var reporterName = require('./get-reporter-name');

if (reporterName !== 'default'){
	childProcess.exec('npm install '+reporterName, {cwd:path.resolve(__dirname, '../..')});
}