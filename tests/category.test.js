const request = require('supertest')
const app = require('../app')

describe('Category Endpoints', () => {
    it('should fetch all categories', async done => {
        const res = await request(app)
            .get('/api/categories?page=0&size=10')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('totalItems')
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('totalPages')
        expect(res.body).toHaveProperty('currentPage')
        done()
    })
    it('should create category', async done => {
        const categoryName = 'New category'
        const res = await request(app)
            .post('/api/categories')
            .send({ name: categoryName })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toMatchObject({ name: categoryName })
        done()
    })
    it('should update category', async done => {
        const categoryName = 'New category'
        const res = await request(app)
            .post('/api/categories')
            .send({ name: categoryName })

        const updateCategory = await request(app)
            .put(`/api/categories/${res.body.id}`)
            .send({ name: `${categoryName} updated` })

        expect(updateCategory.status).toBe(200)
        expect(updateCategory.body).toHaveProperty('id')
        expect(updateCategory.body.name).toBe(`${categoryName} updated`)
        done()
    })
    it('should delete category', async done => {
        const categoryName = 'New category'
        const res = await request(app)
            .post('/api/categories')
            .send({ name: categoryName })

        const updateCategory = await request(app)
            .delete(`/api/categories/${res.body.id}`)

        expect(updateCategory.status).toBe(200)
        expect(updateCategory.body).toEqual({ result: 'Deleted' })
        done()
    })
})