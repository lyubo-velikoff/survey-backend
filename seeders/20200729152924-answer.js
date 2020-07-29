'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('answer', [
            {
                answer: 0,
                title: 'Not at all',
            },
            {
                answer: 1,
                title: 'Several days',
            },
            {
                answer: 2,
                title: 'More than half the days',
            },
            {
                answer: 3,
                title: 'Nearly every day',
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('answer', null, {})
    }
}
