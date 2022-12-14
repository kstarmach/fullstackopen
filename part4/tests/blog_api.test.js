const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('test123', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        blogObject.user = user._id
        const newBlog = await blogObject.save()
        user.blogs.concat(newBlog._id)
        await user.save()
    }

})


describe('HTTP GET', () => {
    test('should return a json of blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should return two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('should have defined id property not __id', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body[0].id).toBeDefined()
    })
})

describe('post of blog post', () => {

    test('should HTTP POST successfully create new blog post', async () => {

        const workingUser = await api
            .post('/api/login')
            .send({ username: 'root', password: 'test123' })

        const newBlog = {
            title: "Catastrophy of modern humanity",
            author: "Elton Jones",
            url: 'https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-5/tests/note_api.test.js',
            likes: 32
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${workingUser.body.token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const content = blogsAtEnd.map(b => b.title)
        expect(content).toContain('Catastrophy of modern humanity')
    })

    test('posting new blogs without likes property should set default value to 0', async () => {

        const workingUser = await api
            .post('/api/login')
            .send({ username: 'root', password: 'test123' })


        const newBlog = {
            title: "Catastrophy of modern humanity",
            author: "Elton Jones",
            url: 'https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-5/tests/note_api.test.js',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${workingUser.body.token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const lastBlogPost = blogsAtEnd[blogsAtEnd.length - 1]
        expect(lastBlogPost.title).toBe('Catastrophy of modern humanity')

        expect(lastBlogPost.likes).toEqual(0)
    })

    test('missing required properties should return 400 Bad Request', async () => {

        const workingUser = await api
            .post('/api/login')
            .send({ username: 'root', password: 'test123' })


        const missingAuthorBlog = {
            title: "Catastrophy of modern humanity",
            url: 'https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-5/tests/note_api.test.js'
        }

        const response = await api
            .post('/api/blogs')
            .send(missingAuthorBlog)
            .set('Authorization', `Bearer ${workingUser.body.token}`)
            .expect(400)

        expect(response.body.error).toBe('missing title or author property')

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('missing token should retur proper status code and error ', async () => {
        //const blogAtStart = await helper.blogsInDb()

        const newBlog = {
            title: "Catastrophy of modern humanity",
            author: "Elton Jones",
            url: 'https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-5/tests/note_api.test.js',
            likes: 12
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
            .expect(401)

        expect(response.body.error).toBe('token missing or invalid')

        //const blogAtEnd = await helper.blogsInDb()
        //expect(blogAtEnd).toHaveLength(blogAtStart.length)
    })
})

describe('deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const workingUser = await api
            .post('/api/login')
            .send({ username: 'root', password: 'test123' })

        const blogsAtStart = await helper.blogsInDb()
        const firstBlog = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${firstBlog.id}`)
            .set('Authorization', `Bearer ${workingUser.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        expect(blogsAtEnd).not.toContainEqual(firstBlog)
    })
}, 10000)

describe('update of a blog', () => {
    test('successfully update of blog likes count', async () => {
        const workingUser = await api
            .post('/api/login')
            .send({ username: 'root', password: 'test123' })

        const blogsAtStart = await helper.blogsInDb()
        const firstBlog = blogsAtStart[0]

        firstBlog.likes += 1
        await api
            .put(`/api/blogs/${firstBlog.id}`)
            .send(firstBlog)
            .set('Authorization', `Bearer ${workingUser.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toEqual(helper.initialBlogs[0].likes + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
