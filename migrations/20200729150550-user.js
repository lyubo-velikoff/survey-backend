'use strict'
/**
 * Migration that creates a user table and drops table if migration failed
 */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            gender: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            postcode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dob: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('user', { cascade: true })
    }
}