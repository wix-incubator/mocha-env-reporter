'use strict';
var expect = require('chai').expect;
var shelljs = require('shelljs');
var path = require('path');
var testProjPath = path.dirname(require.resolve('./embedded/package.json'));

// Object.assign polyfill
// from : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// we need a non-ci environment variables configuration for the test
var baseEnv = Object.assign({}, process.env);
delete baseEnv.TEAMCITY_VERSION;
delete baseEnv.TEAMCITY_PROJECT_NAME;
delete baseEnv.JENKINS_URL;
delete baseEnv.bamboo_planKey;
delete baseEnv.TF_BUILD;
delete baseEnv.BUILDKITE;
delete baseEnv.HUDSON_URL;
delete baseEnv.GO_PIPELINE_LABEL;
delete baseEnv.BITBUCKET_COMMIT;

function expectOk(out, name){
  if (out.code !== 0){
    throw new Error(name + ' FAILED!\n'+out.stdout);
  }
}

// re-install test project, run test and return stdout report
function run(env) {
  var options = {cwd: testProjPath, env:Object.assign({}, env, baseEnv), silent: true};
  var out = shelljs.exec('rm -rf node_modules', options);
  expectOk(out, 'rm -rf node_modules');
  out = shelljs.exec('npm install', options);
  expectOk(out, 'npm install');
  out = shelljs.exec('./node_modules/.bin/mocha test.js --reporter mocha-env-reporter', options);
  expectOk(out, 'mocha');
  return out.stdout;
}

describe('mocha env reporter', function() {
  // generous timeout for slow testing environments as there's some disk I/O involved
  this.timeout(30*1000);

  it('should use teamcity reporter when running in teamcity', function() {
    var log = run({TEAMCITY_VERSION : '123'});
    expect(log).to.contain('##teamcity');
  });

  it('should use jenkins reporter when running in jenkins', function() {
    var log = run({JENKINS_URL : '123'});
    expect(log).to.contain('\n      ․ should run:');
  });

  it('should use bamboo reporter when running in bamboo', function() {
    var logPath = path.join(testProjPath, 'test.log.json');
    try {
      run({'bamboo_planKey': '123', 'MOCHA_FILE': logPath});
      var log = require(logPath);
      expect(log.passes[0].title).to.eql('should run');
    } finally {
      shelljs.exec('rm -rf '+ logPath);
    }
  });

  it('should use "spec" reporter when not running on ci', function() {
    var log = run({});
    expect(log).to.contain('✓ should run');
  });

  it('should use whatever reporter is defined in mocha_reporter environment variable even when running on ci', function() {
    var log = run({TEAMCITY_VERSION : '123', mocha_reporter : 'JSON'});
    expect(log).to.not.contain('##teamcity');
    expect(JSON.parse(log).tests[0].title).to.eql('should run');
  });
});
