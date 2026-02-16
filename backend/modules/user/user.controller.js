const { User } = require('../../db/models');

const updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { name },
            { returnDocument: 'after' }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    updateUser,
};