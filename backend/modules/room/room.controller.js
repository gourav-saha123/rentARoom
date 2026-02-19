const {createRoom, getAllRooms, getRoomsByDistance, updateRoomToOccupied, updateRoomToAvailable} = require('./room.service');
const { Room } = require('../../db/models');

const createRoomHandler = async (req, res) => {
    try {
        // console.log('User Info from Token:', req.user);
        // console.log('Request Body:', req.body);
        const userid = req.user.id;
        req.body.admin = userid;
        if(req.user.role != 'owner') {
            return res.status(403).json({message: 'Only admins can create rooms'});
        }
        const room = await createRoom(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getAllRoomsHandler = async (req, res) => {
    try {
        const userid = req.query.userid;
        console.log('User ID from Params:', userid);
        const rooms = await getAllRooms(userid);
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({error: error.message});
    }
};

const getRoomsByDistanceHandler = async (req, res) => {
    try {
        // console.log('Query Parameters:', req.query);
        const { latitude, longitude, distance, maxPrice = 100000, numberOfRooms = 2 } = req.query;

        // Validate input
        if (!latitude || !longitude || !distance) {
            return res.status(400).json({ error: "Missing query parameters" });
        }

        // Convert to numbers
        const location = [
            parseFloat(longitude), // MongoDB expects [lng, lat]
            parseFloat(latitude)
        ];

        const maxDistance = parseFloat(distance);

        const rooms = await getRoomsByDistance(location, maxDistance, maxPrice, numberOfRooms);

        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateToOccupied = async (req, res) => {
    try {
        const roomId = req.params.id;
        const userId = req.user.id;

        // Fetch the room to check ownership
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (room.admin.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this room' });
        }

        const updatedRoom = await updateRoomToOccupied(roomId);
        res.status(200).json(updatedRoom);
    } catch (error) {
        // console.error('Error updating room:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateToAvailable = async (req, res) => {
    try {
        const roomId = req.params.id;
        const userId = req.user.id;

        // Fetch the room to check ownership
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (room.admin.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this room' });
        }

        const updatedRoom = await updateRoomToAvailable(roomId);
        res.status(200).json(updatedRoom);
    } catch (error) {
        // console.error('Error updating room:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoomHandler,
    getAllRoomsHandler,
    getRoomsByDistanceHandler,
    updateToOccupied,
    updateToAvailable
};