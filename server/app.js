const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  // OR schema (ES6)
  graphiql: true
}))

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
