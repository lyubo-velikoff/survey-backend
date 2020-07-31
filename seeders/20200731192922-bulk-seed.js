'use strict'

const chooseRandom = (array) => Math.floor(Math.random() * array.length)

const generateAnswers = (answerCount, userIds, questionIds, answerIds) => {
    let answers = []
    
    let userIdsArray = userIds.map(u => u.id)
    let questionIdsArray = questionIds.map(q => q.id)
    let answerIdsArray = answerIds.map(a => a.id)
    
    for (let id=1; id <= answerCount; id++) {
        answers.push({
            userId: userIdsArray[chooseRandom(userIdsArray)],
            answerId: answerIdsArray[chooseRandom(answerIdsArray)],
            questionId: questionIdsArray[chooseRandom(questionIdsArray)],
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    return answers
}

module.exports = {
    up: async (queryInterface, Sequelize) => {

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
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('questionAnswer', null, {})
    }
}
