const express = require("express");
const { postInvoice } = require("../../controller/invoiceController")
const { protectRoute } = require("../../controller/authcontroller")
let invoiceRouter = express.Router();

invoiceRouter
    .route("/")
    .post(protectRoute, postInvoice);

module.exports = invoiceRouter;
