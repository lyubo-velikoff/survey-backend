const request = require('supertest')
const app = require('../app')

describe('User Endpoints', () => {
    it('should fetch all users', async done => {
        const res = await request(app)
            .get('/users?page=0&size=10')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('totalItems')
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('totalPages')
        expect(res.body).toHaveProperty('currentPage')
        done()
    })
    it('should create user', async done => {
        const newUser = {
            name: 'test user',
            gender: 'm',
            postcode: 'bd7 1rd',
            dob: '1980-01-05T00:00:00.000Z'
        }
        const res = await request(app)
            .post('/users')
            .send(newUser)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('gender')
        expect(res.body).toHaveProperty('postcode')
        expect(res.body).toHaveProperty('dob')
        expect(res.body).toMatchObject(newUser)
        done()
    })
    it('should update user', async done => {
        const newUser = {
            name: 'test user update',
            gender: 'm',
            postcode: 'bd7 1rd',
            dob: '1980-01-05T00:00:00.000Z'
        }
        const res = await request(app)
            .post('/users')
            .send(newUser)

        const user = await request(app)
            .put(`/users/${res.body.id}`)
            .send({ name: `${newUser.name} updated` })

        expect(user.status).toBe(200)
        expect(user.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('gender')
        expect(res.body).toHaveProperty('postcode')
        expect(res.body).toHaveProperty('dob')
        expect(user.body.name).toBe(`${newUser.name} updated`)
        done()
    })
    it('should delete user', async done => {
        const newUser = {
            name: 'test user delete',
            gender: 'm',
            postcode: 'bd7 1rd',
            dob: '1980-01-05T00:00:00.000Z'
        }
        const res = await request(app)
            .post('/users')
            .send(newUser)

        const user = await request(app)
            .delete(`/users/${res.body.id}`)

        expect(user.status).toBe(200)
        expect(user.body).toEqual({ result: 'Deleted' })
        done()
    })
})