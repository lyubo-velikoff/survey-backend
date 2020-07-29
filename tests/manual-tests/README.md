# How to run manual tests

Install vscode extension *Rest Client* https://marketplace.visualstudio.com/items?itemName=humao.rest-client

Add .vscode/settings.json file

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
            "baseUrl": "http://localhost:3001",
        },

        "prod": {
            "baseUrl": "http://localhost:3001",
        }

    }
}
```

Navigate to any .rest file and click on "Send request" to run.