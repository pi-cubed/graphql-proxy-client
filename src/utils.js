import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { buildClientSchema } from 'graphql';

/**
 * TODO docs
 */
export const withSchema = url =>
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
 */
export const withProps = props => WC => newProps => (
  <WC {...newProps} {...props} />
);

/**
 * TODO docs
 */
export const withDefaults = withProps({
  renderLoading: () => <div>loading...</div>,
  renderError: e => <div>{e.message || 'Something went wrong'}</div>,
  onError: () => {},
  onLoad: () => {}
});

/**
 * TODO docs
 */
export const withLoadingHandler = WC => props => {
  const { loading, renderLoading } = props;
  return loading ? renderLoading() : <WC {...props} />;
};

/**
 * TODO docs
 */
export const withErrorHandler = WC => props => {
  const { error, renderError } = props;
  return error ? renderError(error) : <WC {...props} />;
};

/**
 * TODO docs
 */
export const withTidy = WC => ({
  query,
  mutate,
  schema,
  loading,
  error,
  ...props
}) => (
  <WC
    {...props}
    query={query && query.query}
    schema={schema && schema.schema}
    loading={loading || (query && query.loading) || (schema && schema.loading)}
    error={error || (query && query.error) || (schema && schema.error)}
  />
);

/**
 * TODO docs and do more
 *
 * @private
 */
export const getOperation = action => gql(action).definitions[0].operation;

/**
 * TODO docs and do more
 *
 * @private
 */
export const isMutation = action => getOperation(action) === 'mutation';

/**
 * TODO docs and pluralize
 *
 * @private
 */
export const getField = (action, schema) =>
  buildClientSchema(JSON.parse(schema))
    [isMutation(action) ? 'getMutationType' : 'getQueryType']()
    .getFields()[getName(action)];

/**
 * TODO docs and do
 *
 * @private
 */
export const getType = (action, schema) => {
  const field = getField(action, schema);
  return field && field.type;
};

/**
 * TODO docs and more
 *
 * @private
 */
export const getName = action =>
  gql(action).definitions[0].selectionSet.selections[0].name.value;
