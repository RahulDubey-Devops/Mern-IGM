const express = require('express');
const { validationResult } = require('express-validator');
const { getQuotations } = require('../controllers/quotationController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/view', authenticate, async (req, res) => {
    try {
        const response = await getQuotations(req, res);
        return res.status(response.code).json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

module.exports = router;
