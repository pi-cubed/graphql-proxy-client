import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { buildClientSchema } from 'graphql';

/**
 * TODO docs
 *
 * @private
 */
const withSchema = url =>
  graphql(
    gql`
      query Schema($url: String!) {
        schema(url: $url)
      }
    `,
    {
      name: 'schema',
      options: { variables: { url } }
    }
  );

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
        .catch(error => {
          onError(error);
          this.setState({ error });
        });
    }

    /**
     * TODO docs
     *
     * @private
     */
    render() {
      const { mutate, error } = this.state;
      return (
        <WC loading={!mutate} mutate={mutate} error={error} {...this.props} />
      );
    }
  };

/**
 * TODO docs
 *
 * @private
 */
const withProps = props => WC => newProps => <WC {...newProps} {...props} />;

/**
 * TODO docs
 *
 * @private
 */
const withOperation = (url, action) =>
  isMutation(action) ? withMutation(url, action) : withQuery(url, action);

/**
 * TODO docs and do more
 *
 * @private
 */
const getOperation = action => gql(action).definitions[0].operation;

/**
 * TODO docs and do more
 *
 * @private
 */
const isMutation = action => getOperation(action) === 'mutation';

/**
 * TODO docs and pluralize
 *
 * @private
 */
const getField = (action, schema) =>
  buildClientSchema(JSON.parse(schema))
    [isMutation(action) ? 'getMutationType' : 'getQueryType']()
    .getFields()[getName(action)];

/**
 * TODO docs and do
 *
 * @private
 */
const getType = (action, schema) => {
  const field = getField(action, schema);
  return field && field.type;
};

/**
 * TODO docs and more
 *
 * @private
 */
const getName = action =>
  gql(action).definitions[0].selectionSet.selections[0].name.value;

/**
 * TODO docs
 *
 * @private
 */
const withTidy = WC => ({
  query,
  mutate,
  schema,
  loading,
  error,
  ...props
}) => (
  <WC
    query={query && query.query}
    schema={schema && schema.schema}
    loading={loading || (query && query.loading) || (schema && schema.loading)}
    error={error || (query && query.error) || (schema && schema.error)}
    {...props}
  />
);

/**
 * TODO docs
 *
 * @private
 */
const withDataHandler = WC => props => {
  const { query, mutate, schema, action, onError, onLoad } = props;
  const raw = query || mutate;
  const data = raw && JSON.parse(raw);
  const name = getName(action);
  const type = getType(action, schema);
  const error = !type && `Action not found: ${name}`;
  if (error) {
    onError(error);
  } else {
    onLoad();
  }
  return (
    <WC
      type={type}
      name={name}
      data={data}
      error={error || props.error}
      {...props}
    />
  );
};

/**
 * TODO docs
 *
 * @private
 */
const withLoadingHandler = WC => props => {
  const { loading, renderLoading } = props;
  return loading ? renderLoading() : <WC {...props} />;
};

/**
 * TODO docs
 *
 * @private
 */
const withErrorHandler = WC => props => {
  const { error, renderError, onError } = props;
  return error ? renderError(error) : <WC {...props} />;
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
 *
 * @private
 */
const withDefaults = withProps({
  renderLoading: () => <div>loading...</div>,
  renderError: e => <div>{e.message}</div>,
  onError: () => {},
  onLoad: () => {}
});

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
 * Return component outputting the response of the GraphQL action.
 *
 * @param {Object} props - The component props.
 * @param {string} props.url - The GraphQL api endpoint.
 * @param {string} props.action - The GraphQL action.
 * @param {GraphQLSchema} [props.schema] - The schema for the GraphQL api.
 * @param {Action~onChange} [props.onChange] - The data change handler.
 * @param {ApolloClient} props.client - The Apollo client.
 * @returns {Component} A list around the items.
 *
 * @example <caption>Display users' names from GraphQL API</caption>
 * <Action
 *   url="https://us1.prisma.sh/dylan-richardson-59e89b/hew/dev"
 *   action={'query Q { users { name } }'}
 * >
 *   <Put />
 * </Action>
 */
export const Action = props => {
  const _ = withAction(props)(props.children);
  return <_ />;
};
/**
 * This callback handles Action change events.
 *
 * @callback Action~onChange
 * @param {*} value
 */
