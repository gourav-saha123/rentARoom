const express = require('express');
const {createRoomHandler, getAllRoomsHandler, getRoomsByDistanceHandler} = require('./room.controller');
const isAuth = require('../../middlewares/isAuth');

const router = express.Router();

router.post('/create', isAuth, createRoomHandler);
router.get('/allrooms', isAuth, getAllRoomsHandler);
router.get('/search', isAuth, getRoomsByDistanceHandler);

module.exports = router;