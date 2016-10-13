'use strict';
var config = require('./configuration');

var environmentName = (process.env.BUILD_NUMBER || process.env.TEAMCITY_VERSION) ? 'teamcity' : 'default';

module.exports = config['mocha-env-reporters'][environmentName];
