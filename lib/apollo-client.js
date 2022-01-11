import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUrl = `${process.env.STRAPI_API_URL}/graphql`;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default client;
