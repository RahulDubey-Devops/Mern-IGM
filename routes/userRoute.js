const express = require('express');
const { validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');
const { userValidations } = require('../validations/validations');
const router = express.Router();

router.post('/register', userValidations, async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json(error.array());
        }
        const response = await registerUser(req, res);
        return res.status(response.code).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});


router.post('/login', userValidations, async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json(error.array());
        }
        const response = await loginUser(req, res);
        return res.status(response.code).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

module.exports = router;
