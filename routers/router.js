const express = require("express");
const router = express.Router();

const { register } = require('../controller/authController')
const { login } = require('../controller/authController')
const { jwtMiddleware } = require('../middleware/jwtMiddleware')

router.post('/api/register', register);
router.post('/api/login', login);
router.get('/api/protected', jwtMiddleware);

module.exports = router;