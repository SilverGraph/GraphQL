const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql





// DUMMY DATA
// let books = [
//   {name: 'Name of the wind', genre: 'Fantasy', id: '1', authorid: '1'},
//   {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
//   {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3'},
//   {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorid: '2'},
//   {name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorid: '3'},
//   {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorid: '3'}
// ]
//
// let authors = [
//   {name: 'Patrick Rothfuss', age: 44, id: '1'},
//   {name: 'Brandon Sanderson', age: 42, id: '2'},
//   {name: 'Terry Pratchett', age: 66, id: '3'}
// ]





const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // parent represents the BOOK data that was requested
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorid })
        return Author.findById(parent.authorId)
      }
    }
  })
})

/*
  The reason why fields is a function and not a normal object
  because the book and author objects are connected and should
  be executed asynchronously. Hence when the rest of the code
  is executed/ready the fields prop is executed after and it
  knows what AuthorType and BookType are.
*/

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType), // not BOOKTYPE because it denotes a single book while an author can have a list of books
      resolve(parent, args) {
        // return _.filter(books, { authorid: parent.id })
        return Book.find({ authorId: parent.id })
      }
    }
  })
})





const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // CODE TO GET DATA FROM DB OR OTHER SOURCE
        // return _.find(books, { id: args.id })
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find({})
      }
    }
  }
})





// Mutations are used for CRUD Operation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // ADD
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({ // from Mongoose model
          name: args.name,
          age: args.age
        })
        // return so that we could see the data back in GraphiQL
        // return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        // return book.save()
      }
    }

  }
})





module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
