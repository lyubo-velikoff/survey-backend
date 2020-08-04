'use strict'

/**
 * Seeder that bulk inserts answer types
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('answer', [
            {
                answer: 1,
                title: '0 - Not at all',
            },
            {
                answer: 2,
                title: '1 - Several days',
            },
            {
                answer: 3,
                title: '2 - More than half the days',
            },
            {
                answer: 4,
                title: '3 - Nearly every day',
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('answer', null, {})
    }
}
