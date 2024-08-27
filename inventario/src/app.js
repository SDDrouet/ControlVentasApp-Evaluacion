const express = require('express');
const productosRoutes = require('./routes/productosRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({origin: true}));


app.use(express.json());

app.use('/api', productosRoutes);

module.exports = app;
