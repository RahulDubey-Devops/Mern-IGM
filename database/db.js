const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

const connectToMongo = async () => {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/TestBuild?directConnection=true&serverSelectionTimeoutMS=2000";
    
    if (!uri) {
        console.error('MongoDB URI is undefined');
        return;
    }

    try {
        await mongoose.connect(uri); // Options no longer necessary for newer Mongoose versions
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
