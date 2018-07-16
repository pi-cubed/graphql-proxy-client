import React, { Component } from 'react';
import { render } from 'react-dom';
import { Schema, ProxyProvider } from '../../src';

const Demo = () => (
  <div>
    <h1>graphql-proxy-client Demo</h1>
    <h3>https://proxy-graphql.herokuapp.com</h3>
    <ProxyProvider>
      <Schema url="https://proxy-graphql.herokuapp.com" />
    </ProxyProvider>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
