const app = require('./app')
const db = require('./models')
const PORT = process.env.PORT || 3001

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
})