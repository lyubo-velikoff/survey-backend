'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'roleId' })
            Role.hasMany(models.UserRole, { foreignKey: 'roleId' })

            Role.belongsToMany(models.Permission, { through: models.RolePermission, foreignKey: 'roleId' })
            Role.hasMany(models.RolePermission, { foreignKey: 'roleId' })
        }
    };
    Role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'role',
        timestamps: false
    })
    return Role
}