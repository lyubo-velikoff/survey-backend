'use strict'
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const controller = {}

/**
 * Loop through the folder and import all controllers
 */
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const control = require(path.join(__dirname, file))
        controller[file.replace('.js', '')] = control
    })

module.exports = controller