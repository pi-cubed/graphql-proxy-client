import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import fetch from 'unfetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 * Return the children with an ApolloClient which defaults to point at
 *   http://proxy-graphql.herokuapp.com.
 *
 * @param {Object} props - The component props.
 * @param {ApolloClient} [props.uri] - The GraphQL endpoint.
 * @param {ApolloClient} [props.client] - The Apollo client.
 * @returns {Component} An ApolloProvider with a custom client.
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
export const ProxyProvider = ({
  uri = 'https://proxy-graphql.herokuapp.com',
  client,
  children
}) => (
  <ApolloProvider
    client={
      client ||
      new ApolloClient({
        link: createHttpLink({ uri, fetch }),
        cache: new InMemoryCache()
      })
    }
  >
    {children}
  </ApolloProvider>
);
