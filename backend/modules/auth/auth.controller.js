const { verifyToken, generateToken } = require('../../utils/jwt.util');
const { Owner, User } = require('../../db/models');
const { hashPassword, comparePassword } = require('../../utils/password.util');
const { checkEmailExists, createOwner, createUser } = require('./auth.service');

const registerOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (await checkEmailExists(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newOwner = await createOwner({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: 'Owner registered successfully', owner: newOwner });
    } catch (error) {
        // console.error('Error registering owner:', error);
        res.status(500).json({ message: 'Error registering owner', error: error.message });
    }   
};

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (await checkEmailExists(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await createUser({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }   
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = generateToken({ id: user._id, role: 'user' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await comparePassword(password, owner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = generateToken({ id: owner._id, role: 'owner' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const me = async (req, res) => {
    try {
        // console.log('User ID from token:', req.user);
        const userId = req.user.id;
        const role = req.user.role;

        if (role == 'owner') {
            const owner = await Owner.findById(userId).select('-password');
            if (!owner) {
                return res.status(404).json({ message: 'Owner not found' });
            }
            return res.status(200).json({ owner });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    registerOwner,
    registerUser,
    loginUser,
    loginOwner,
    me,
    logout
};
