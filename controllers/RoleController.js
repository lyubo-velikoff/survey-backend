const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const { Role, RolePermission, Permission } = db

exports.create = (req, res) => {
    const { name } = req.body
    Role.create({ name })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    Role.findAndCountAll({
        limit,
        offset,
        include: [{ model: Permission }]
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

exports.findOne = (req, res) => {
    Role.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.update = (req, res) => {
    const { name } = req.body
    Role.update({ name }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

exports.updatePermission = (req, res) => {
    const { permissionId } = req.body
    Role.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                RolePermission.findOrCreate({ where: { roleId: req.params.id, permissionId }, defaults: { permissionId } })
                    .then((updatedData) => res.send(updatedData))
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'Role does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

exports.deletePermission = (req, res) => {
    const { permissionId } = req.body
    Role.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                RolePermission.destroy({ where: { roleId: req.params.id, permissionId } })
                    .then((updatedData) => {
                        res.json({ result: updatedData == 1 ? 'Deleted' : 'failed' })
                    })
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'Role does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

exports.delete = (req, res) => {
    Role.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}

exports.deleteAll = (req, res) => {

}