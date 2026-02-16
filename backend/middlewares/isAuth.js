const { verifyToken, generateToken } = require('../utils/jwt.util');

const isAuth = (req, res, next) => {
    const authHeader = req.cookies.token;
    // console.log('Auth Header:', authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = isAuth;