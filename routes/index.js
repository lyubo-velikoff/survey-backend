'use strict'
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const express = require('express')
const router = express.Router()
const routes = {}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const route = require(path.join(__dirname, file))
        routes[file.replace('.js', '')] = route
    })


router.use('/users', routes.UserRouter)
router.use('/answers', routes.AnswerRouter)

module.exports = router