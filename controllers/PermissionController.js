const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const { Permission } = db

/**
 * Create permission
 * @param { Object } req
 * @param { Object } res
 */
exports.create = (req, res) => {
    const { title, priority } = req.body
    Permission.create({ title, priority })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Find and count all permissions and return a list of permissions and metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    Permission.findAndCountAll({
        limit,
        offset,
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

/**
 * Get a specific permission
 * @param { Object } req
 * @param { Object } res
 */
exports.findOne = (req, res) => {
    Permission.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Update a specific permission
 * @param { Object } req
 * @param { Object } res
 */
exports.update = (req, res) => {
    const { title, priority } = req.body
    Permission.update({ title, priority }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

/**
 * Delete a specific permission
 * @param { Object } req
 * @param { Object } res
 */
exports.delete = (req, res) => {
    Permission.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}