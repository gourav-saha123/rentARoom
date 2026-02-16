const express = require('express');
const { updateUser } = require('./user.controller');
const isAuth = require('../../middlewares/isAuth');

const router = express.Router();

router.put('/update', isAuth, updateUser);

module.exports = router;