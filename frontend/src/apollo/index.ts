import { BACKEND_URL } from '@/env.config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
export * from './queries/auth';

console.log(BACKEND_URL);
export const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
});
