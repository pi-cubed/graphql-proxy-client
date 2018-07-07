import React, { Component } from 'react';
import { render } from 'react-dom';
import { Action, ProxyProvider } from '../../src';
import { Put } from 'typed-ui';

const Demo = () => (
  <div>
    <h1>graphql-proxy-client Demo</h1>
    <ProxyProvider>
      <Action
        url="https://us1.prisma.sh/dylan-richardson-59e89b/hew/dev"
        action="query Q { users {id name} }"
        onLoad={d => console.log('load', d)}
        onError={e => console.log('err', e)}
      >
        <Put />
      </Action>
    </ProxyProvider>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
