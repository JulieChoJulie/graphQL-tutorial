import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="main">
            <h1>Hello</h1>
            <BookList/>
        </div>
    </ApolloProvider>
  );
}

export default App;
