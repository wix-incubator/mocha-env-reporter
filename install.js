'use strict';
var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');
var config = require('./configuration');
var reporterName = require('./get-reporter-name');

if (config.dependenciesVersions.hasOwnProperty(reporterName) && fs.existsSync(path.resolve(__dirname, '../../package.json'))){
	try {
		require.resolve(reporterName);
		console.log('reporter '+reporterName +' found. not installing');
	} catch(e) {
		var toInstall = reporterName + '@' + config.dependenciesVersions[reporterName];
		console.log('did not find reporter '+reporterName +'. Installing '+toInstall);
		childProcess.exec('npm install ' + toInstall, {cwd: path.resolve(__dirname, '../..')});
	}
} else {
	console.info('reporter ' + reporterName + ' is not recognized by mocha-env-reporter, not installing it automatically.');
}