const express = require('express');
const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);


module.exports = userRouter;