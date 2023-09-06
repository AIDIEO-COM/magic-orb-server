const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
}


const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = {
    createToken,
    verifyToken
}