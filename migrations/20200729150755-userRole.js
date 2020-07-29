'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('userRole', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'user',
                    },
                    key: 'id'
                },
                allowNull: false
            },
            roleId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'role',
                    },
                    key: 'id'
                },
                allowNull: false
            },
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: false
        })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('userRole')
    }
}