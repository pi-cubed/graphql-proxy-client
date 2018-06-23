import expect from 'expect';
import React from 'react';
import { GraphQLString } from 'graphql';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Action, ProxyProvider } from 'src';
import { Put } from 'typed-ui';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

const withAction = (action, { onLoad = () => {}, onError = () => {} }) => {
  const wrapper = mount(
    <ProxyProvider>
      <Action
        url="http://proxy-graphql.herokuapp.com"
        action={action}
        onLoad={() => onLoad(wrapper)}
        onError={e => onError(wrapper, e)}
      >
        <Put />
      </Action>
    </ProxyProvider>
  );
};

describe('Action', () => {
  const ACTION = 'test';

  xit('renders errors from an invalid query', done =>
    withAction(`query Q { ${ACTION} }`, {
      onError: wrapper => {
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.text()).toEqual(`Action not found: ${ACTION}`);
          done();
        }, 1000);
      }
    }));

  it('calls onError from an invalid query', done =>
    withAction(`query Q { ${ACTION} }`, {
      onError: (wrapper, error) => {
        // expect(error).toInclude(`Cannot query field '${ACTION}'`);
        done();
      }
    }));

  xit('renders errors from a mutation', done =>
    withAction(`mutation M { ${ACTION} }`, {
      onError: wrapper => {
        wrapper.update();
        // console.log(wrapper.debug());
        expect(wrapper.contains(`Action not found: ${ACTION}`)).toBeTruthy();
        done();
      }
    }));

  xit('calls onError from an invalid mutation', done =>
    withAction(`mutation M { ${ACTION} }`, {
      onError: (wrapper, e) => {
        expect(e).toEqual(`Action not found: ${ACTION}`);
        done();
      }
    }));
});
