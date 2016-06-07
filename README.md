# mocha-env-reporter
[![npm version](https://badge.fury.io/js/mocha-env-reporter.svg)](https://badge.fury.io/js/mocha-env-reporter)

A [mocha](https://mochajs.org/) reporter that switches output format between built-in 'spec' and [mocha-teamcity-reporter](https://www.npmjs.com/package/mocha-teamcity-reporter) base on where tests are being executed - locally or ci. Actual switch is environment variable `BUILD_NUMBER` || `TEAMCITY_VERSION`. Given environment variable `BUILD_NUMBER` or `TEAMCITY_VERSION` is set, [mocha-teamcity-reporter](https://www.npmjs.com/package/mocha-teamcity-reporter) is used, otherwise - 'spec' builtin mocha reporter.

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


# License

We use a custom license, see ```LICENSE.md```
