import { useMemo} from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge'

export const APOLLO_STATE_PROPS_NAME = '__APOLLO_STATE__';

let apolloClient;

function createApolloClient(serverUrl) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: serverUrl,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(serverUrl, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(serverUrl);

  if(initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }
    if (typeof window === 'undefined') return _apolloClient;

    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPS_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(serverUrl, pageProps) {
  const state = pageProps[APOLLO_STATE_PROPS_NAME];
  const store = useMemo(() => initializeApollo(serverUrl, state), [state]);
  return store;
}