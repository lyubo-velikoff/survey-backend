'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('role', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: false
        })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('role')
    }
}