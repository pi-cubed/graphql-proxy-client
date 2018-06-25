import expect from 'expect';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Action, ProxyProvider } from 'src';
import { Put } from 'typed-ui';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

export const withAction = (action, onLoad, onError) => {
  const wrapper = mount(
    <ProxyProvider>
      <Action
        url="https://proxy-graphql.herokuapp.com"
        action={action}
        onLoad={d => onLoad(wrapper, d)}
        onError={e => onError(wrapper, e)}
      >
        <Put />
      </Action>
    </ProxyProvider>
  );
};

export const VALID = 'test';
export const INVALID = 'invalid';

export const renderEquals = (action, text) => done => {
  const handler = wrapper => {
    wrapper.update();
    expect(wrapper.text()).toEqual(text);
    done();
  };
  withAction(action, handler, handler);
};

export const dataEquals = (action, expected) => done =>
  withAction(
    action,
    (_, data) => {
      expect(data).toEqual(expected);
      done();
    },
    () => {}
  );

export const errorEquals = (action, expected) => done =>
  withAction(
    action,
    () => {},
    (_, { message }) => {
      expect(message).toEqual(expected);
      done();
    }
  );
