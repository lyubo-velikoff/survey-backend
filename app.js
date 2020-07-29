require('dotenv').config('.env')
const express = require('express')
const bodyParser = require('body-parser')
const IndexRouter = require('./routes/index')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', IndexRouter)

module.exports = app