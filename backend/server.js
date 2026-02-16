const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');

const authRoutes = require('./modules/auth/auth.route');
const ownerRoutes = require('./modules/owner/owner.route');
const userRoutes = require('./modules/user/user.route');
const roomRoutes = require('./modules/room/room.route');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/owner', ownerRoutes);
app.use('/room', roomRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});