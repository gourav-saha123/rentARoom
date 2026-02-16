const { Owner } = require('../../db/models');

const updateOwner = async (req, res) => {
    try {
        const id = req.user.id; 

        const { name, phone } = req.body;

        const owner = await Owner.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(phone && { phone })
            },
            {
                returnDocument: 'after',
                runValidators: true  
            }
        );

        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        res.json({
            message: 'Owner updated successfully',
            owner
        });

    } catch (error) {
        console.error('Error updating owner:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getDetails = async (req, res) => {
    try {
        const id = req.query.userid;
        const owner = await Owner.findById(id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.json({
            message: 'Owner details fetched successfully',
            owner
        });
    } catch (error) {
        // console.error('Error fetching owner details:', error);
        res.status(500).json({
            message: 'Server error',    
            error: error.message
        });
    }
};

module.exports = {
    updateOwner,
    getDetails
};
