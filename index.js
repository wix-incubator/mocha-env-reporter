'use strict';

module.exports = process.env.IS_BUILD_AGENT ? require('mocha-teamcity-reporter') : require('mocha').reporters.spec;
