const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true }
});

const quotationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    products: { type: [productSchema], required: true },
    date: { type: Date, default: Date.now },
    pdf: { type: String, required: true }
}, { timestamps: true })

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;