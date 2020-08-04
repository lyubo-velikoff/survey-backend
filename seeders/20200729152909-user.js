'use strict'

/**
 * Seeder that generates some random users, and 2 predefined ones for testing
 */

const faker = require('faker')
let genders = ['m', 'f', 'o']
// faker.locale = 'uk'
let leedsPostcodes = ['LS1 1AZ','LS1 1BA','LS1 1BL','LS1 1DN','LS1 1DP','LS1 1EB','LS1 1ED','LS1 1EE','LS1 1EF','LS1 1EG']

const chooseRandom = (array) => Math.floor(Math.random() * array.length)

const generateUsers = (userCount) => {
    let users = []
    for (let id=1; id <= userCount; id++) {
        let randomGender = chooseRandom(genders)
        let randomPostCode = chooseRandom(leedsPostcodes)
        users.push({
            name: faker.name.firstName(),
            gender: genders[randomGender],
            postcode: leedsPostcodes[randomPostCode],
            dob: faker.date.between('1930-01-01', '1999-12-31'),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    return users
}


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user', [
            {
                name: 'Lyubo',
                gender: 'm',
                postcode: leedsPostcodes[chooseRandom(leedsPostcodes)],
                dob: faker.date.between('1980-01-01', '1999-12-31'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Silvia',
                gender: 'f',
                postcode: leedsPostcodes[chooseRandom(leedsPostcodes)],
                dob: faker.date.between('1980-01-01', '1999-12-31'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            ...generateUsers(20)
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user', null, {})
    }
}
