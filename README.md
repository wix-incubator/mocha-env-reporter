# mocha-env-reporter
[![Build Status](https://img.shields.io/travis/wix/mocha-env-reporter/master.svg?label=build%20status)](https://travis-ci.org/wix/mocha-env-reporter) [![npm version](https://badge.fury.io/js/mocha-env-reporter.svg)](https://badge.fury.io/js/mocha-env-reporter)

A [mocha](https://mochajs.org/) reporter that switches output format between built-in 'spec' and customised CI reporters base on where tests are being executed - locally or ci. Actual switch is implemented by detecting an environment variable unique to each CI environment. The default is 'spec' builtin mocha reporter.

The reporter also supports an environment variable `mocha_reporter` in which you can set an arbitrary environment reporter. This is useful if you use an unidentified continous integration service.

Currently supported custom CI environments (see ```defaults.json```):
 - Teamcity
 - bamboo
 - jenkins

# install

```
npm install --save-dev mocha-env-reporter
```

# usage

In you package.json append `--reporter mocha-env-reporter` to your mocha test command, ex.
  
```js
...
  "scripts": {
    "test": "mocha --reporter mocha-env-reporter"
  },
...
```
## configuration

In order to override the choice of reporter simply set environment variable `mocha_reporter` to the reporter name (example  `specs`).

The default reporters per environments are defined at [defaults.json](https://github.com/wix/mocha-env-reporter/blob/master/defaults.json)

# License

Licensed under MIT License.
