const express = require('express');
const clientesRoutes = require('./routes/clientesRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({origin: true}));


app.use(express.json());

app.use('/api', clientesRoutes);

module.exports = app;
