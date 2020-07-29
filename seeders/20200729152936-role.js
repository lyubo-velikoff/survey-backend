'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('role', [
            {
                name: 'Respondent',
            },
            {
                name: 'Administrator',
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('role', null, {})
    }
}
