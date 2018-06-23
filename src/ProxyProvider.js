import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import fetch from 'unfetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 * TODO docs
 */
export const ProxyProvider = ({
  uri = 'http://proxy-graphql.herokuapp.com',
  children
}) => (
  <ApolloProvider
    client={
      new ApolloClient({
        link: createHttpLink({ uri, fetch }),
        cache: new InMemoryCache()
      })
    }
  >
    {children}
  </ApolloProvider>
);
