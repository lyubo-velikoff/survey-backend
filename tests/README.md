
# Test

To run tests, go to root folder and execute.

```
npm test
```

When above is called, cross-env package sets the NODE_ENV to test so that config.js settings are loaded for test environment. Test database is preffixed to "test" as per "/config/config.js".

e.g if you have a database called "survey" when you run **npm test** it will run migrate:reset and jest in "survey_test" database.

## Manual test

Install vscode extension *Rest Client* https://marketplace.visualstudio.com/items?itemName=humao.rest-client

Add /.vscode/settings.json file

Example
```
{
    "rest-client.environmentVariables": {

        "$shared": {
            "baseUrl": "http://localhost:3001",
        },

        "local": {
            "baseUrl": "http://localhost:3001",
        },

        "dev": {
            "baseUrl": "https://lyubo-survey-backend.herokuapp.com",
        },

        "prod": {
            "baseUrl": "http://localhost:3001",
        }

    }
}
```

Navigate to any .rest file and click on "Send request" to run.