'use strict'

/**
 * Seeder that inserts predefined permissions
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('permission', [
            {
                title: 'full',
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('permission', null, {})
    }
}
