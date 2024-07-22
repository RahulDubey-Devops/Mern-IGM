const { findUserByEmail, createUser } = require("../database/crud");
const { generateToken, matchPassword, hashPassword } = require("../middleware/authMiddleware");
const { errorResponse, successResponse } = require("../models/ResponseModel");
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await findUserByEmail(email);
    console.log(userExists)
    if (userExists) {
        return errorResponse('User already exists', 409)
    }

    const hashedPass = await hashPassword(password)

    const newUser = await createUser(email, hashedPass)
    const payload = {
        userId: newUser._id,
        email: newUser.email,
        token: generateToken(newUser._id)
    }
    return successResponse(payload, 'User registered')
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (user && await matchPassword(password, user.password)) {
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };
        return successResponse(response, "login successfull")
    } else {
        return errorResponse('Invalid email or password', 401);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
