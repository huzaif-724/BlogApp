const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token =
        req.cookies?.token || 
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied, no token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = { id: decoded.userId }; // Correct the field to `userId`\
    
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

module.exports = { authenticate };
