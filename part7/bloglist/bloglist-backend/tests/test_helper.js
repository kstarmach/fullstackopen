const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const userInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, userInDb
}