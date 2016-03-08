'use strict';
var expect = require('chai').expect,
  shelljs = require('shelljs');

function run() {
  var out = shelljs.exec('./node_modules/mocha/bin/mocha ./test/embedded/test.js --reporter index');
  expect(out.code).to.equal(0);
  return out.output;
}

describe('mocha ci reporter', function() {

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
