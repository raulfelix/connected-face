import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
  request: (operation) => {
    const token = sessionStorage.getItem('token')
    console.log('operation', token)
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

cache.writeData({
  data: {
    isLoggedIn: !!sessionStorage.getItem('token'),
    email: sessionStorage.getItem('email')
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
