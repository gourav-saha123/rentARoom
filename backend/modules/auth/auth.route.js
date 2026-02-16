const express = require('express');
const { registerOwner, registerUser, loginUser, loginOwner, me, logout } = require('./auth.controller');
const isAuth = require('../../middlewares/isAuth');

const router = express.Router();

router.post('/register/owner', registerOwner);
router.post('/register/user', registerUser);
router.post('/login/user', loginUser);
router.post('/login/owner', loginOwner);
router.get('/me', isAuth, me);
router.delete('/logout', isAuth, logout);

module.exports = router;