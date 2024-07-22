const { createQuotation } = require('../database/crud');
const { successResponse, errorResponse } = require('../models/ResponseModel');
const { uploadFileToFirebase } = require('../services/firebaseService');
const { generatePdf } = require('../services/generatePdfService');
const fs = require('fs');

const addProducts = async (req, res) => {
    try {
        const { products } = req.body;
        const user = req.user._id;
        const { pdfPath, htmlFilePath } = await generatePdf(products);

        // Upload the PDF to Firebase Storage
        const destination = `invoices/${user}_${Date.now()}.pdf`;
        const firebaseUrl = await uploadFileToFirebase(pdfPath, destination);

        // Delete the local PDF file after upload
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(htmlFilePath)

        // Save the Firebase URL to MongoDB
        const quotation = await createQuotation(user, products, firebaseUrl);

        return successResponse(quotation, 'Quotation generated');
    } catch (error) {
        console.error('Error generating quotation:', error);
        return errorResponse('Failed to generate quotation', 500);
    }
};

module.exports = {
    addProducts,
};
