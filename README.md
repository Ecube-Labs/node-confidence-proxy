# confidence-proxy
Please refer to [hapijs/confidence](https://github.com/hapijs/confidence) for the details.
## usage
\- config.js
```js
const confidenceProxyHandler = require('confidence-proxy');
module.exports = new Proxy({
  /* confidence document */
  foo: {
    $filter: 'asd'
    $default: {
      bar: 'A'
    }
  }
}, confidenceProxyHandler);
```

\- foo.js
```js
const config = require('./config');
console.log(config.foo.bar); //A
```
// TODO

## feature
// TODO

## TODO
- add test codes
- custom criteria: now it always use `process.env`
