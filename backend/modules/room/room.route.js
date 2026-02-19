const express = require('express');
const {createRoomHandler, getAllRoomsHandler, getRoomsByDistanceHandler, updateToOccupied, updateToAvailable} = require('./room.controller');
const isAuth = require('../../middlewares/isAuth');

const router = express.Router();

router.post('/create', isAuth, createRoomHandler);
router.put('/update/:id/occupied', isAuth, updateToOccupied);
router.put('/update/:id/available', isAuth, updateToAvailable);
router.get('/allrooms', isAuth, getAllRoomsHandler);
router.get('/search', isAuth, getRoomsByDistanceHandler);

module.exports = router;