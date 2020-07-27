const express = require('express')
const userRoutes = require('./userRoutes')

const app = express.Router();

app.use("/user", userRoutes)


module.exports = app