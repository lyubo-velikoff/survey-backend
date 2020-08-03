'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('answer', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            answer: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            title: {
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
        await queryInterface.dropTable('answer', { cascade: true })
    }
}