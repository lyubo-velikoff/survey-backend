const app = require('./app')
const expressSwagger = require('express-swagger-generator')(app)
const db = require('./models')
const PORT = process.env.PORT || 3001

let options = {
    swaggerDefinition: {
        info: {
            description: 'Documentation in progress, for a full list of endpoints check tests/manual-tests/*.rest',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `localhost:${PORT}`,
        basePath: '/',
        produces: [
            'application/json',
            'application/xml'
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {}
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
}
expressSwagger(options)

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
