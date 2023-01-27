const { UserInputError, AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'A_REALY_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args)
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: author.id } }).populate('author')
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate(
          'author',
        )
        //return books.filter((b) => b.genres.includes(args.genre))
      }

      return await Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return await books.filter((book) => book.author.toString() === root.id)
        .length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = new Author({ ...args })
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      try {
        author.born = args.setBornTo
        //const updatedAuthor = { ...author, born: args.setBornTo }
        //authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      console.log({ args })
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
