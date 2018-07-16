import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {
  withSchema,
  withDefaults,
  withLoadingHandler,
  withErrorHandler,
  withProps,
  withTidy,
  getOperation,
  getField,
  getType,
  getName,
  isMutation
} from './utils';

/**
 * TODO docs
 *
 * @private
 */
const withQuery = (url, query) =>
  graphql(
    gql`
      query Query($url: String!, $query: String!) {
        query(url: $url, query: $query)
      }
    `,
    {
      name: 'query',
      options: {
        variables: {
          url,
          query
        }
      }
    }
  );

/**
 * TODO docs
 *
 * @private
 */
const withMutation = (url, mutation) =>
  graphql(
    gql`
      mutation Mutation($url: String!, $mutation: String!) {
        mutate(url: $url, mutation: $mutation)
      }
    `,
    {
      name: 'mutation',
      options: {
        variables: {
          url,
          mutation
        }
      }
    }
  );

/**
 * TODO docs
 *
 * @private
 */
const withOperation = (url, action) =>
  isMutation(action) ? withMutation(url, action) : withQuery(url, action);

/**
 * TODO docs
 *
 * @private
 */
const withMutationHandler = WC =>
  /**
   * TODO docs
   *
   * @extends Component
   *
   * @private
   */
  class MutationHandler extends Component {
    state = {};

    /**
     * TODO docs
     *
     * @private
     */
    componentDidMount() {
      const { mutation, onError } = this.props;
      mutation()
        .then(({ data: { mutate } }) => this.setState({ mutate }))
        .catch(error => this.setState({ error }));
    }

    /**
     * TODO docs
     *
     * @private
     */
    render() {
      const { mutate, error } = this.state;
      return (
        <WC
          {...this.props}
          loading={(!mutate && !error) || this.props.loading}
          mutate={mutate}
          error={error}
        />
      );
    }
  };

/**
 * TODO docs
 *
 * @private
 */
const withDataHandler = WC =>
  class DataHandler extends Component {
    constructor(props) {
      super(props);
      const { query, mutate, action, schema, error } = props;
      this.state = { error };
      if (schema) {
        const raw = query || mutate;
        const name = getName(action);
        const type = getType(action, schema);
        this.state = {
          data: raw && JSON.parse(raw)[name],
          name,
          type,
          error: (!type && { message: `Action not found: ${name}` }) || error
        };
      }
    }
    componentDidMount() {
      const { onError, onLoad } = this.props;
      const { error, data } = this.state;
      if (error) {
        onError(error);
      } else {
        onLoad(data);
      }
    }

    render() {
      return <WC {...this.props} {...this.state} />;
    }
  };

/**
 * TODO docs
 *
 * @private
 */
const withHandlers = isMutation =>
  compose(
    isMutation ? withMutationHandler : _ => _,
    withLoadingHandler,
    withDataHandler,
    withErrorHandler
  );

/**
 * TODO docs
 */
export const withAction = props => {
  const { url, action } = props;
  return compose(
    withDefaults,
    withProps(props),
    withSchema(url),
    withOperation(url, action),
    withTidy,
    withHandlers(isMutation(action))
  );
};

/**
 * Component provides the response of the GraphQL action as a prop to child.
 *
 * @param {Object} props - The component props.
 * @param {string} props.url - The GraphQL api endpoint.
 * @param {string} props.action - The GraphQL action.
 * @param {GraphQLSchema} [props.schema] - The schema for the GraphQL api.
 * @param {Action~onChange} [props.onChange] - The data change handler.
 * @param {ApolloClient} props.client - The Apollo client.
 * @returns {Component} A component that displays the response from the action.
 *
 * @example <caption>Display users' names from GraphQL API</caption>
 * <ProxyProvider>
 *   <Action
 *     url="http://proxy-graphql.herokuapp.com"
 *     action="query Q { test }"
 *   >
 *     <Put />
 *   </Action>
 * </ProxyProvider>
 */
export const Action = props => {
  const _ = withAction(props)(newProps =>
    React.cloneElement(props.children, { ...newProps })
  );
  return <_ />;
};
/**
 * This callback handles Action change events.
 *
 * @callback Action~onChange
 * @param {*} value
 */
