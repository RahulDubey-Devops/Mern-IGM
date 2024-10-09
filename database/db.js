const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectToMongo = async () => {
    const uri = process.env.MONGODB_URI; // Use the environment variable
    if (!uri) {
        console.error('MongoDB URI is undefined');
        return;
    }
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
