'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    };
    RolePermission.init({
        roleId: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
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
        sequelize,
        modelName: 'RolePermission',
        tableName: 'rolePermission',
        timestamps: false
    })
    return RolePermission
}