const { body } = require('express-validator');

const userValidations = [
    body('email', 'Enter a valid email').exists().isEmail(),
    body('password', 'password is required').exists()
]

const productValidations = [
    body('products', 'products not present').isLength({ min: 1 }).exists(),
    body('products.*.name', 'Enter a valid product name').exists().isString().isLength({ min: 1 }),
    body('products.*.qty', 'Enter a valid product quantity').exists().isInt({ min: 1 }),
    body('products.*.rate', 'Enter a valid product rate').exists().isInt({ min: 1 })
]

module.exports = {
    userValidations,
    productValidations
}