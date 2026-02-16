const { Room } = require('../../db/models');

const createRoom = async (roomData) => {
    const room = await Room.create(roomData);
    return room;
};

const getAllRooms = async (userid) => {
    console.log('Fetching rooms for user ID:', userid);
    const rooms = await Room.find({
        admin: userid
    });
    return rooms;
};

const getRoomsByDistance = async (location, distance, maxPrice, numberOfRooms) => {
    const rooms = await Room.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: location
                },
                $maxDistance: distance
            }
        },
        rent: { $lte: maxPrice },
        numberOfrooms: { $gte: numberOfRooms }
    });
    return rooms;
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomsByDistance,
};
