const express = require('express');

const {updateOwner, getDetails} = require('./owner.controller');
const isAuth = require('../../middlewares/isAuth');

const router = express.Router();

router.put('/update', isAuth, updateOwner);
router.get('/ownerDetails', isAuth, getDetails);

module.exports = router;