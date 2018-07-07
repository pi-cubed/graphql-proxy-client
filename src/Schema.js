import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {
  GraphQLString,
  buildClientSchema,
  GraphQLInputObjectType
} from 'graphql';
import { print } from 'graphql/language';
import { Put } from 'typed-ui';
import { Action } from './Action';
import {
  withSchema,
  withTidy,
  withLoadingHandler,
  withErrorHandler,
  withProps
} from './utils';

/**
 * TODO docs
 *
 * @private
 */
const getAction = (field, values) =>
  print({
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        name: { kind: 'Name', value: 'Query' },
        operation: 'query',
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: field.name },
              selectionSet: {
                kind: 'SelectionSet',
                selections: getSelections(field.type.getFields(), values)
              }
            }
          ]
        }
      }
    ]
  });

/**
 * TODO docs
 *
 * @private
 */
const getSelections = (fields, values) =>
  _.keys(fields).map(name => ({
    kind: 'Field',
    name: {
      kind: 'Name',
      value: name
    },
    arguments: fields[name].args.map(arg => ({
      kind: 'Argument',
      name: {
        kind: 'Name',
        value: arg.name
      },
      value: {
        kind: 'StringValue',
        value: values[name][arg.name]
      }
    }))
  }));

/**
 * TODO docs
 *
 * @private
 */
const getType = field =>
  new GraphQLInputObjectType({
    name: field.name,
    fields: _.reduce(
      field.args,
      (acc, { name, type }) => ({
        ...acc,
        [name]: { type }
      }),
      {}
    )
  });

/**
 * TODO docs
 *
 * @private
 */
class Query extends Component {
  /**
   * TODO docs
   *
   * @private
   */
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      variables: {},
      token: null,
      action: null
    };
    this.type = getType(props.field);
  }

  render() {
    return (
      <div>
        <Put
          type={this.type}
          onChange={variables => this.setState({ variables, submitted: false })}
        />
        <Put
          type={this.props.field.type}
          onChange={data =>
            this.setState({
              action: getAction(props.field, data),
              submitted: false
            })
          }
          data={{ f: 'hey' }}
        />
        <Put
          type={
            new GraphQLInputObjectType({
              name: 'token',
              fields: {
                token: { type: GraphQLString }
              }
            })
          }
          onChange={token => this.setState({ token, submitted: false })}
        />
        {this.state.submitted ? (
          <Action
            url={this.props.url}
            action={this.state.action}
            variables={this.state.variables}
            token={this.state.token}
          />
        ) : null}
        <button onClick={() => this.setState({ submitted: true })}>
          Submit
        </button>
      </div>
    );
  }
}

/**
 * TODO docs
 *
 * @private
 */
const PutSchema = url => ({ schema }) => {
  const clientSchema = buildClientSchema(JSON.parse(schema));
  const fields = clientSchema.getQueryType().getFields();
  return (
    <div>
      <Query url={url} field={fields['test']} />
    </div>
  );
};

/**
 * TODO docs
 *
 * @private
 */
const makeSchema = props =>
  compose(
    withProps(props),
    withSchema(props.url),
    withTidy,
    withLoadingHandler,
    withErrorHandler
  )(PutSchema);

/**
 * TODO docs
 */
export const Schema = props => {
  const _ = makeSchema(props);
  return <_ />;
};
