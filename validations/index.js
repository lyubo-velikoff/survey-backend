'use strict'
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const validations = {}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const validation = require(path.join(__dirname, file))
        validations[file.replace('.js', '')] = validation
    })

module.exports = validations