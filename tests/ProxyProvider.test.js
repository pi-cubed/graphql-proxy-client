import expect from 'expect';
import React from 'react';
import { GraphQLString } from 'graphql';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Action, ProxyProvider } from 'src';
import { Put } from 'typed-ui';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

describe('ProxyProvider', () => {
  xit('works', () => {});
});
