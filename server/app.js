const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// ALLOW CROSS-ORIGIN REQUEST
app.use(cors())

// CONNECT TO MONGODB
mongoose.connect('mongodb+srv://raj-aryan:RajAryan@cluster0.tpzwd.mongodb.net/gql-ninja?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// This function allows to check successful connection to DB
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
})





app.use('/graphql', graphqlHTTP({
  schema: schema,
  // OR schema (ES6)
  // graphiql: true
}))

app.listen(4000, () => {
  console.log('Server started on port 3000');
})
