const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.title || !body.author) {
      return response
        .status(400)
        .json({ error: 'missing title or author property' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  },
)

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(400).json({ error: 'wrong id or already delated' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: 'you are unauthorized to do this action' })
    }

    await Blog.findByIdAndDelete(blog.id)

    response.status(204).end()
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(204).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  console.log(comment)
  const blogToComment = await Blog.findById(request.params.id)

  blogToComment.comments = blogToComment.comments.concat(comment)

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToComment,
    {
      new: true,
    },
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
