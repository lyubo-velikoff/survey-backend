const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const { User, UserRole, Role, QuestionAnswer } = db

exports.create = (req, res) => {
    const { name, gender, postcode, dob } = req.body
    User.create({ name, gender, postcode, dob })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.answer = (req, res) => {
    const { questionId, answerId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                QuestionAnswer.create({ userId: req.params.id, questionId, answerId })
                    .then((updatedData) => res.send(updatedData))
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

exports.findAllAnswers = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    QuestionAnswer.findAndCountAll({
        limit,
        offset,
        include: [{ all: true }]
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}


exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    User.findAndCountAll({
        limit,
        offset,
        include: [{ model : Role }]
        
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

exports.findOne = (req, res) => {
    User.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.update = (req, res) => {
    const { name, gender, postcode, dob } = req.body
    User.update({ name, gender, postcode, dob }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

exports.updateRole = (req, res) => {
    const { roleId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                UserRole.findOrCreate({ where: { userId: req.params.id, roleId }, defaults: { roleId } })
                    .then((updatedData) => res.send(updatedData))
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

exports.deleteRole = (req, res) => {
    const { roleId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                UserRole.destroy({ where: { userId: req.params.id, roleId } })
                    .then((updatedData) => {
                        res.json({ result: updatedData == 1 ? 'Deleted' : 'failed' })
                    })
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

exports.delete = (req, res) => {
    User.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}

exports.deleteAll = (req, res) => {

}