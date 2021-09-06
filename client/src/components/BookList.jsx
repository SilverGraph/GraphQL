import React from "react"
import { gql, useQuery } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'

// CREATING A QUERY
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  function displayBooks() {
    if(loading)
      return <p>Loading...</p>;
    if(error)
      return <p>Error :(</p>;

    return data.books.map(book => (
      <li key={book.id}>{book.name}</li>
    ))
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  )
}

// ASKING 'graphql' TO BIND 'getBooksQuery' TO 'BookList' COMPONENT
export default graphql(getBooksQuery)(BookList)
