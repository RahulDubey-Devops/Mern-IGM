const Quotation = require("../models/Quotation");
const User = require("../models/Users");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const findUserById = async (id) => {
    return await User.findById(id).select('-password')
}

const createUser = async (email, password) => {
    const newUser = await User.create({
        email,
        password,
    });
    return newUser;
}

const createQuotation = async (userId, products, pdfUrl) => {
    return await Quotation.create({
        userId,
        products,
        pdf: pdfUrl,
    });
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    createQuotation
}