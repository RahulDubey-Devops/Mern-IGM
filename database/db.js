const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is required here as well

const connectToMongo = async () => {
    const uri = mongodb://rahuldubey:rahuldubey1@localhost:27017/TestBuild 
    if (!uri) {
        console.error('MongoDB URI is undefined');
        return; // Early return if URI is undefined
    }
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
