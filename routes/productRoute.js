const express = require('express');
const { validationResult } = require('express-validator');
const { addProducts } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');
const { productValidations } = require('../validations/validations');
const router = express.Router();

router.post('/add', authenticate, productValidations, async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json(error.array());
        }
        const response = await addProducts(req, res);
        return res.status(response.code).json(response.data);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
