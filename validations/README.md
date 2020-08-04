# Validations are using express-validator component

[Express Validator](https://express-validator.github.io/docs/index.html)

Example usage

```
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

app.post('/user', [
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});
```
