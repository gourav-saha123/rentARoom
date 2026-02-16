const {Owner, User} = require('../../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkEmailExists = async (email) => {
    const owner = await Owner.find({ email });
    const user = await User.find({ email });
    return owner.length > 0 || user.length > 0;
}

const createOwner = async (ownerData) => {
    const { username, email, password, mobile } = ownerData;

    // create a new owner
    const newOwner = new Owner({
        username,
        email,
        password,
        mobile
    });

    // save the owner to the database
    await newOwner.save();
    return newOwner;
}

const createUser = async (userData) => {
    const { username, email, password } = userData;

    // create a new user
    const newUser = new User({
        username,
        email,
        password
    });

    // save the user to the database
    await newUser.save();
    return newUser;
}

module.exports = {
    checkEmailExists,
    createOwner,
    createUser
}