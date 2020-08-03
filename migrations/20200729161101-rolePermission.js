'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('rolePermission', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            permissionId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'permission',
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
        await queryInterface.dropTable('rolePermission', { cascade: true })
    }
}