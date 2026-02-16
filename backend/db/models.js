const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {   
        type: String,
        required: true,
        unique: true 
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    rooms : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],

});
   

const userSchema = new mongoose.Schema({
    username: {   
        type: String,
        required: true,
        unique: true 
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const roomSchema = new mongoose.Schema({
    description: { type: String, required: true },
    numberOfrooms: { type: Number, required: true },
    floor: { type: Number, required: true },
    rent: { type: Number, required: true },

    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'available'
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        },
    },

    writtenLocation: { type: String, required: true },

    images: [{ type: String }],

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
});

roomSchema.index({ location: "2dsphere" });

const Owner = mongoose.model('Owner', adminSchema);
const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);

module.exports = {
    Owner,
    User,
    Room
};
