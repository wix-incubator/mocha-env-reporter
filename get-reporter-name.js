'use strict';
var config = require('./configuration');

function isDefinedEnv(){
	for(var i = 0; i < arguments.length; ++ i) {
		if (process.env.hasOwnProperty(arguments[i])){
			return true;
		}
	}
	return false;
}

var environmentName =
	isDefinedEnv('TEAMCITY_VERSION', 'TEAMCITY_PROJECT_NAME') ? 'teamcity' :
	isDefinedEnv('JENKINS_URL') ? 'jenkins' :
	isDefinedEnv('bamboo_planKey') ? 'bamboo' :
	isDefinedEnv('TF_BUILD') ? 'team foundation' :
	isDefinedEnv('BUILDKITE') ? 'buildkite' :
	isDefinedEnv('HUDSON_URL') ? 'hudson' :
	isDefinedEnv('GO_PIPELINE_LABEL') ? 'gocd' :
	isDefinedEnv('BITBUCKET_COMMIT') ? 'bitbucket pipelines' :
	'default';

module.exports = process.env.mocha_reporter || config['mocha-env-reporters'][environmentName];
