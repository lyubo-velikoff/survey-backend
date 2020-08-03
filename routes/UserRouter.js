const express = require('express')
const { UserController } = require('../controllers')
const { UserValidation } = require('../validations')
const router = express.Router()

router.post('/', UserValidation.create, UserController.create)
router.get('/:id/questions', UserValidation.findAllAvailableQuestions, UserController.findAllAvailableQuestions)


/**
 * Get a list of users
 * @route GET /users
 * @group User - Operations about user
 * @returns {Error}  default - Unexpected error
 */
router.get('/', UserController.findAll)

/**
 * Get a list of user answers
 * @route GET /users/answers
 * @group User - Operations about user
 * @returns {Error}  default - Unexpected error
 */
router.get('/answers', UserController.findAllAnswers)
router.post('/:id/answers', UserValidation.answer, UserController.answer)
router.get('/:id', UserValidation.findOne, UserController.findOne)
router.get('/names/:name', UserValidation.findUserByName, UserController.findUserByName) // this is just helping ui
router.put('/:id', UserValidation.update, UserController.update)
router.put('/:id/role', UserValidation.updateRole, UserController.updateRole)
router.delete('/:id/role', UserValidation.deleteRole, UserController.deleteRole)
router.delete('/:id', UserValidation.delete, UserController.delete)

module.exports = router
