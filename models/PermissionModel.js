'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Permission.belongsToMany(models.Role, { through: models.RolePermission, foreignKey: 'permissionId' })
            Permission.hasMany(models.RolePermission, { foreignKey: 'permissionId' })
        }
    };
    Permission.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permission',
        timestamps: false
    })
    return Permission
}