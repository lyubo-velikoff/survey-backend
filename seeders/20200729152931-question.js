'use strict'

/**
 * Seeder that bulk inserts a predefined list of questions
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('question', [
            {
                title: 'Feeling nervous, anxious or on edge',
                priority: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Not being able to stop or control worrying',
                priority: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Worrying too much about different things',
                priority: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Trouble relaxing',
                priority: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Being so restless that it is hard to sit still',
                priority: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Becoming easily annoyed or irritable',
                priority: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Feeling afraid as if something awful might happen',
                priority: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('question', null, {})
    }
}
