import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  buildClientSchema,
  GraphQLInputObjectType,
  isLeafType,
  isWrappingType,
  getNamedType
} from 'graphql';
import { print } from 'graphql/language';
import { Put } from 'typed-ui';
import { Action } from './Action';
import {
  withSchema,
  withDefaults,
  withTidy,
  withLoadingHandler,
  withErrorHandler,
  withProps
} from './utils';

const getArgKind = type =>
  isLeafType(type)
    ? `${getNamedType(type).name}Value`
    : isWrappingType(type)
      ? getArgKind(type.ofType)
      : '';

const getArgs = (type, args, input) =>
  args.map(({ name, type }) => ({
    kind: 'Argument',
    name: { kind: 'Name', value: name },
    value: {
      kind: getArgKind(type),
      value: input[name]
    }
  }));

const getSelectionSet = type =>
  isLeafType(type)
    ? undefined
    : isWrappingType(type)
      ? getSelectionSet(type.ofType)
      : {
          kind: 'SelectionSet',
          selections: type.getFields().map(({ name, type }) => ({
            kind: 'Field',
            name: { kind: 'Name', value: name },
            selectionSet: getSelectionSet(type)
          }))
        };

/**
 * TODO docs
 *
 * @private
 */
const getAction = ({ name, args, type }, { input }) =>
  print({
    kind: 'Document',
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'query',
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: { kind: 'Name', value: name },
              selectionSet: getSelectionSet(type),
              arguments: getArgs(type, args, input)
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
class PutSchema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: null
    };
  }
  render() {
    const clientSchema = buildClientSchema(JSON.parse(this.props.schema));
    const queryType = clientSchema.getQueryType();
    return (
      <div>
        <Put
          type={
            new GraphQLObjectType({
              name: 'Actions',
              fields: {
                query: { type: queryType },
                submit: { type: GraphQLString }
              }
            })
          }
          onChange={({ submit: { selected }, query: { output } }) =>
            selected
              ? this.setState({
                  actions: _.keys(
                    _.pickBy(output, ({ selected }) => selected)
                  ).map(query =>
                    getAction(queryType.getFields()[query], output[query])
                  )
                })
              : null
          }
        />
        {this.state.actions
          ? this.state.actions.map((action, i) => (
              <Action key={i} url={this.props.url} action={action}>
                <Put />
              </Action>
            ))
          : null}
      </div>
    );
  }
}

/**
 * TODO docs
 *
 * @private
 */
const makeSchema = props =>
  compose(
    withDefaults,
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
