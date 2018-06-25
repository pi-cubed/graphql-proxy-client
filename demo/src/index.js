import React, { Component } from 'react';
import { render } from 'react-dom';
import { Action, ProxyProvider } from '../../src';
import { Put } from 'typed-ui';

const Demo = () => (
  <div>
    <h1>graphql-proxy-client Demo</h1>
    <ProxyProvider>
      <Action
        url="https://proxy-graphql.herokuapp.com"
        action="query Q { test }"
      >
        <Put />
      </Action>
    </ProxyProvider>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
