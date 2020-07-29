'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user', [
            {
                name: 'Lyubo',
                gender: 'm',
                postcode: 'ls21 1fd',
                dob: new Date(1992, 10, 27),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Silvia',
                gender: 'f',
                postcode: 'ls21 1fd',
                dob: new Date(1993, 2, 8),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user', null, {})
    }
}
