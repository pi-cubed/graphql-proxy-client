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

## Members

<dl>
<dt><a href="#withAction">withAction</a></dt>
<dd><p>TODO docs</p>
</dd>
<dt><a href="#Action">Action</a> ⇒ <code>Component</code></dt>
<dd><p>Return component outputting the response of the GraphQL action.</p>
</dd>
<dt><a href="#ProxyProvider">ProxyProvider</a> ⇒ <code>Component</code></dt>
<dd><p>Return the children with an ApolloClient which defaults to point at
  <a href="http://proxy-graphql.herokuapp.com">http://proxy-graphql.herokuapp.com</a>.</p>
</dd>
</dl>

<a name="withAction"></a>

## withAction

TODO docs

**Kind**: global variable  
<a name="Action"></a>

## Action ⇒ <code>Component</code>

Return component outputting the response of the GraphQL action.

**Kind**: global variable  
**Returns**: <code>Component</code> - A component that displays the response from the action.

| Param            | Type                                       | Description                     |
| ---------------- | ------------------------------------------ | ------------------------------- |
| props            | <code>Object</code>                        | The component props.            |
| props.url        | <code>string</code>                        | The GraphQL api endpoint.       |
| props.action     | <code>string</code>                        | The GraphQL action.             |
| [props.schema]   | <code>GraphQLSchema</code>                 | The schema for the GraphQL api. |
| [props.onChange] | [<code>onChange</code>](#Action..onChange) | The data change handler.        |
| props.client     | <code>ApolloClient</code>                  | The Apollo client.              |

**Example** _(Display users&#x27; names from GraphQL API)_

```js
<ProxyProvider>
  <Action url="http://proxy-graphql.herokuapp.com" action="query Q { test }">
    <Put />
  </Action>
</ProxyProvider>
```

<a name="Action..onChange"></a>

### Action~onChange : <code>function</code>

This callback handles Action change events.

**Kind**: inner typedef of [<code>Action</code>](#Action)

| Param | Type            |
| ----- | --------------- |
| value | <code>\*</code> |

<a name="ProxyProvider"></a>

## ProxyProvider ⇒ <code>Component</code>

Return the children with an ApolloClient which defaults to point at
http://proxy-graphql.herokuapp.com.

**Kind**: global variable  
**Returns**: <code>Component</code> - An ApolloProvider with a custom client.

| Param          | Type                      | Description           |
| -------------- | ------------------------- | --------------------- |
| props          | <code>Object</code>       | The component props.  |
| [props.uri]    | <code>ApolloClient</code> | The GraphQL endpoint. |
| [props.client] | <code>ApolloClient</code> | The Apollo client.    |

**Example** _(Display users&#x27; names from GraphQL API)_

```js
<ProxyProvider>
  <Action url="http://proxy-graphql.herokuapp.com" action="query Q { test }">
    <Put />
  </Action>
</ProxyProvider>
```

## Maintainers

- [Dylan Richardson](https://github.com/drich14)

## License

MIT © [Pi Cubed](https://pi-cubed.github.io)
