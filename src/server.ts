import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotEnv from 'dotenv'

import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import connection from './database/util'
import { verifyUser } from './context'
//set env variables
dotEnv.config()

const app = express()

//db connectivity
connection()

//cors
app.use(cors())

// body parser middleware
app.use(express.json())

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req)
    return {
      //@ts-ignore
      email: req.email
    }
  }
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
  console.log(`GraphQL Endpoint: ${apolloServer.graphqlPath}`)
})
