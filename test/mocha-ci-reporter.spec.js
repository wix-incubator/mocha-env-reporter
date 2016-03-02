'use strict';
const expect = require('chai').expect,
  shelljs = require('shelljs');

describe('mocha ci reporter', () => {

  it('should use "mocha-teamcity-reporter" reporter when running on ci', () => {
    process.env.IS_BUILD_AGENT = 'true';

    expect(run()).to.contain('##teamcity');
  });

  it('should use "spec" reporter when not running on ci', () => {
    delete process.env.IS_BUILD_AGENT;

    expect(run()).to.contain('✓ should run');
  });

  function run() {
    const out = shelljs.exec('./node_modules/mocha/bin/mocha ./test/embedded/test.js --reporter index');
    expect(out.code).to.equal(0);
    return out.output;
  }
});
