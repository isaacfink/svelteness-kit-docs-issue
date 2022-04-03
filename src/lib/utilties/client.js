import { initClient } from '@urql/svelte';

const GRAPHQL_ENDPOINT = 'http://127.0.0.1:8000/api/'

const client = initClient({
  url: GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    return {
      headers:{
        'Content-Type': 'application/json',
      }
    }
  }
});

export default client;