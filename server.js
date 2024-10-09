
const connectToMongo = require('./database/db');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const quotationRoutes = require('./routes/quotationRoute');
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Available Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotations', quotationRoutes);

connectToMongo();
app.listen(process.env.PORT || 5000, () => {
    // console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    console.log("App is Listening on Port 5000");
})
