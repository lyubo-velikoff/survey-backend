const request = require('supertest')
const app = require('../app')

describe('Question Endpoints', () => {
    it('should fetch all questions', async done => {
        const res = await request(app)
            .get('/questions')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('totalItems')
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('totalPages')
        expect(res.body).toHaveProperty('currentPage')
        done()
    })
    it('should create question', async done => {
        const newQuestion = {
            title: 'Feeling happy',
            priority: 1
        }
        const res = await request(app)
            .post('/questions')
            .send(newQuestion)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('priority')
        expect(res.body).toHaveProperty('updatedAt')
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toMatchObject(newQuestion)
        done()
    })
    it('should update question', async done => {
        const newQuestion = {
            title: 'Feeling lonely',
            priority: 1
        }
        const res = await request(app)
            .post('/questions')
            .send(newQuestion)

        const question = await request(app)
            .put(`/questions/${res.body.id}`)
            .send({ title: `${newQuestion.title} updated` })

        expect(question.status).toBe(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('priority')
        expect(res.body).toHaveProperty('updatedAt')
        expect(res.body).toHaveProperty('createdAt')
        expect(question.body.title).toBe(`${newQuestion.title} updated`)
        done()
    })
    it('should delete question', async done => {
        const newQuestion = {
            title: 'Feeling tired',
            priority: 1
        }
        const res = await request(app)
            .post('/questions')
            .send(newQuestion)

        const question = await request(app)
            .delete(`/questions/${res.body.id}`)

        expect(question.status).toBe(200)
        expect(question.body).toEqual({ result: 'Deleted' })
        done()
    })
})