import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotEnv from 'dotenv'

import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { connection } from './database/util/index'
import { verifyUser } from './context'

type ObjectId = typeof import('mongodb').ObjectID

interface reqContextInterface {
  req: {
    email: ObjectId
    loggedInUserId: ObjectId
  }
}

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
  context: async ({ req }: reqContextInterface) => {
    await verifyUser(req)
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId
    }
  }
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
  console.log(`GraphQL Endpoint: ${apolloServer.graphqlPath}`)
})
