
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI; // Make sure this matches your env variable name

const connectToMongo = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
