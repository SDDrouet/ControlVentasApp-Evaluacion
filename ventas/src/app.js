const express = require('express');
const ventasRoutes = require('./routes/ventasRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({origin: true}));


app.use(express.json());

app.use('/api', ventasRoutes);

module.exports = app;
