const jwt = require('jsonwebtoken');
const { errorResponse } = require('../models/ResponseModel');
const { findUserById } = require('../database/crud');
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const matchPassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt)
  return hashedPass
}

const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await findUserById(decoded.id);
      next();
    } catch (error) {
      return errorResponse('Authorization failed', 401);
    }
  }

  if (!token) {
    return errorResponse('Not authorized', 401)
  }
};

module.exports = {
  generateToken,
  matchPassword,
  hashPassword,
  authenticate
};
