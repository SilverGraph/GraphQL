import { gql } from '@apollo/client'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorid: String!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation }
