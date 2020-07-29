require('dotenv').config('../.env')
console.log(`Getting config for ${process.env.NODE_ENV} with user ${process.env.DB_USERNAME}`)
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env
module.exports = {
    local: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: 'postgres',
        define: {
            charset: 'utf8',
            freezeTableName: true,
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        }
    },
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: 'postgres',
        define: {
            charset: 'utf8',
            freezeTableName: true,
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        }
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE + '_test',
        host: DB_HOST,
        dialect: 'postgres',
        logging: false,
        define: {
            charset: 'utf8',
            freezeTableName: true,
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        }
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: 'postgres',
        define: {
            charset: 'utf8',
            freezeTableName: true,
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        }
    }
}