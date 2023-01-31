// const { execute, subscribe } = require('graphql')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
// const { expressMiddleware } = require('@apollo/server/express4')
// const cors = require('cors')
// const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'A_REALY_SECRET_KEY'

const mongoose = require('mongoose')

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI =
  'mongodb+srv://starmil:GmarQz81MRg09rgW@cluster0.exzlqd2.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB: ', error.message)
  })

mongoose.set('debug', true)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  // app.use(
  //   '/',
  //   cors(),
  //   bodyParser.json(),
  //   expressMiddleware(server, {
  //     context: async ({ req }) => {
  //       if (auth && auth.toLowerCase().startsWith('bearer ')) {
  //         const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
  //         const currentUser = await User.findById(decodedToken.id)

  //         return { currentUser }
  //       }
  //     },
  //   }),
  // )

  // await server.start()

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`),
  )
}

start()
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })