const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is required for environment variables

const connectToMongo = async () => {
    // Try to load the MongoDB URI from environment variables first
    const uri ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2";
 
    if (!uri) {
        console.error('MongoDB URI is undefined');
        return; // Early return if URI is undefined
    }

    try {
        // Connect to MongoDB using the provided URI
        await mongoose.connect(uri, {
            // Recommended settings, these options are no longer needed in newer Mongoose versions
            // useNewUrlParser: true, 
            // useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;

