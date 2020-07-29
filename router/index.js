const express = require('express');
const userRoutes = require('./userRoutes');
const invoiceRoutes = require('./invoiceRoutes');

const app = express.Router();

app.use('/user', userRoutes);
app.use('/invoice', invoiceRoutes);

module.exports = app;
