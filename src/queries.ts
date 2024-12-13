import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://YOUR_SUPABASE_GRAPHQL_URL',
  headers: {
    Authorization: `Bearer YOUR_SUPABASE_ANON_KEY`,
  },
  cache: new InMemoryCache(),
});

export default client;
