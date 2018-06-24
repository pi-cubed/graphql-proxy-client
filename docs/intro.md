# graphql-proxy-client

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Send proxied actions to arbitrary GraphQL endpoints.

[build-badge]: https://img.shields.io/travis/pi-cubed/graphql-proxy-client/master.png?style=flat-square
[build]: https://travis-ci.org/pi-cubed/graphql-proxy-client
[npm-badge]: https://img.shields.io/npm/v/@pi-cubed/graphql-proxy-client.png?style=flat-square
[npm]: https://www.npmjs.org/package/@pi-cubed/graphql-proxy-client
[coveralls-badge]: https://img.shields.io/coveralls/pi-cubed/graphql-proxy-client/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/pi-cubed/graphql-proxy-client

## Install

```
$ yarn add @pi-cubed/graphql-proxy-client
```

## Usage

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Put } from 'typed-ui';
import { Action, ProxyProvider } from '@pi-cubed/graphql-proxy-client';

const Demo = () => (
  <div>
    <h1>graphql-proxy-client Demo</h1>
    <ProxyProvider>
      <Action
        url="http://proxy-graphql.herokuapp.com"
        action="query Q { test }"
      >
        <Put />
      </Action>
    </ProxyProvider>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
```

## API

[Docs](api.md)

## Maintainers

- [Dylan Richardson](https://github.com/drich14)

## License

MIT © [Pi Cubed](https://pi-cubed.github.io)
