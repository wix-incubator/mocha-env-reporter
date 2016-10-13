'use strict';
var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');
var config = require('./configuration');
var reporterName = require('./get-reporter-name');

if (config.dependenciesVersions.hasOwnProperty(reporterName) && fs.existsSync(path.resolve(__dirname, '../../package.json'))){
	childProcess.exec('npm install '+reporterName + '@'+config.dependenciesVersions[reporterName], {cwd:path.resolve(__dirname, '../..')});
}