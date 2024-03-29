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
  mutation ($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorid) {
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation }
