'use strict';

var reporter = process.env.mocha_reporter;
var builtInReporters = require('mocha').reporters;
if(!reporter) {
     // keep this for backwards compatibility
    module.exports = (process.env.BUILD_NUMBER || process.env.TEAMCITY_VERSION) ? require('mocha-teamcity-reporter') : builtInReporters.spec;
} else if(builtInReporters.hasOwnProperty(reporter)) {
    module.exports = builtInReporters[reporter];
} else {
    module.exports = require(reporter);
}
