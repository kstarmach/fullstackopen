const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')

const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('test123', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('when there is initially one user at db', () => {
    test('succeeded new user added to db', async () => {
        const userAtStart = await helper.userInDb()

        const newUser = {
            username: 'starmil',
            name: 'Kamil Starmach',
            password: 'test123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = userAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('proper error code and message if user already exist', async () => {
        const userAtStart = await helper.userInDb()

        const newUser = {
            username: 'root',
            name: 'Emil Starmach',
            password: '123test'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })

    test('invalid add user operation return proper status code and error message', async () => {
        const userAtStart = await helper.userInDb()

        const incorectUsername = {
            username: 'ks',
            name: 'Kamil Starmach',
            password: 'test123'
        }

        var response = await api
            .post('/api/users')
            .send(incorectUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        var userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
        expect(response.body.error).toContain('username must be at least 3 characters long')


        const incorectPassword = {
            username: 'kstar',
            name: 'Kamil Starmach',
            password: 'ps'
        }

        response = await api
            .post('/api/users')
            .send(incorectPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
        expect(response.body.error).toContain('password must be at least 3 characters long')

    })
})

afterAll(() => {
    mongoose.connection.close()
})