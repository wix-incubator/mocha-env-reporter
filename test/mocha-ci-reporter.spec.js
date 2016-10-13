'use strict';
var expect = require('chai').expect;
var shelljs = require('shelljs');
var path = require('path');
var testProjPath = path.dirname(require.resolve('./embedded/package.json'));

// re-install test project, run test and return stdout report
function run() {
  var out = shelljs.exec('rm -rf node_modules', {cwd: testProjPath});
  expect(out.code, 'rm -rf node_modules').to.equal(0);
  out = shelljs.exec('npm install', {cwd: testProjPath});
  expect(out.code, 'npm install').to.equal(0);
  out = shelljs.exec('./node_modules/.bin/mocha test.js --reporter mocha-env-reporter', {cwd: testProjPath});
  expect(out.code).to.equal(0);
  return out.stdout;
}

describe('mocha env reporter', function() {
  this.timeout(10*1000);

  it('should use "mocha-teamcity-reporter" reporter when running with BUILD_NUMBER env variable', function() {
    delete process.env.TEAMCITY_VERSION;
    process.env.BUILD_NUMBER = '123';

    expect(run()).to.contain('##teamcity');
  });

  it('should use "mocha-teamcity-reporter" reporter when running with TEAMCITY_VERSION env variable', function() {
    delete process.env.BUILD_NUMBER;
    process.env.TEAMCITY_VERSION = '123';

    expect(run()).to.contain('##teamcity');
  });

  it('should use "spec" reporter when not running on ci', function() {
    delete process.env.BUILD_NUMBER;
    delete process.env.TEAMCITY_VERSION;

    expect(run()).to.contain('✓ should run');
  });
});
