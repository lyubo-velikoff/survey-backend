'use strict'
const faker = require('faker')

const chooseRandom = (array) => Math.floor(Math.random() * array.length)

const generateAnswers = (answerCount, userIds, questionIds, answerIds) => {
    let answers = []
    
    let userIdsArray = userIds.map(u => u.id)
    let questionIdsArray = questionIds.map(q => q.id)
    let answerIdsArray = answerIds.map(a => a.id)
    let oneMonthAgo = null
    for (let id=1; id <= answerCount; id++) {
        oneMonthAgo = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            new Date().getDate()
        )
        answers.push({
            userId: userIdsArray[chooseRandom(userIdsArray)],
            answerId: answerIdsArray[chooseRandom(answerIdsArray)],
            questionId: questionIdsArray[chooseRandom(questionIdsArray)],
            createdAt: faker.date.between(oneMonthAgo, new Date()),
            updatedAt: new Date(),
        })
    }
    return answers
}

const generateRoles = (roleCount, userIds, roleIds) => {
    let roles = []
    
    let userIdsArray = userIds.map(u => u.id)
    let roleIdsArray = roleIds.map(q => q.id)
    
    for (let id=1; id <= roleCount; id++) {
        roles.push({
            userId: userIdsArray[chooseRandom(userIdsArray)],
            roleId: roleIdsArray[chooseRandom(roleIdsArray)],
        })
    }
    return roles
}

module.exports = {
    up: async (queryInterface, Sequelize) => {

        /* Add question answers */
        const [ userIds ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."user"'
        )

        const [ questionIds ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."question"'
        )

        const [ answerIds ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."answer"'
        )

        const data = generateAnswers(100, userIds, questionIds, answerIds)

        await queryInterface.bulkInsert('questionAnswer', data, {})

        /* Add user roles */
        const [ roleIds ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."role"'
        )

        const userRoles = generateRoles(100, userIds, roleIds)

        await queryInterface.bulkInsert('userRole', userRoles, {})
        
        /* Add role permissions */
        const [ administratorRole ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."role" where name = \'Administrator\''
        )

        const [ fullPermission ] = await queryInterface.sequelize.query(
            'SELECT id FROM "public"."permission" where title = \'full\''
        )

        const rolePermissionData = [{
            roleId: administratorRole[0].id,
            permissionId: fullPermission[0].id
        }]

        await queryInterface.bulkInsert('rolePermission', rolePermissionData, {})

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('questionAnswer', null, {})
        await queryInterface.bulkDelete('userRole', null, {})
        await queryInterface.bulkDelete('rolePermission', null, {})
    }
}
