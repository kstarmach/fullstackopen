const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const blogsRouter = require('./controllers/blogs')

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app

