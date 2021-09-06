import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider // HELPS REACT TO UNDERSTAND WHAT APOLLO IS DOING
} from "@apollo/client";

import BookList from './components/BookList'
import AddBook from './components/AddBook'



// APOLLO-CLIENT SETUP
const client = new ApolloClient({
  // MAKING REQUESTS FROM THIS END-POINT IN OUR APPLICATION
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});



function App() {
  return (
    // HELPS TO INJECT DATA INTO WHATEVER'S INSIDE THIS TAG
    <ApolloProvider client={client}>

      <div id="main">
        <h1>Silver's Reading List</h1>
        <BookList />
        <AddBook />
      </div>

    </ApolloProvider>
  );
}

export default App;
