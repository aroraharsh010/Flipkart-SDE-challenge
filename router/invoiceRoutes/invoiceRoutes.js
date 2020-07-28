const express = require("express");
const { postInvoice, getInvoice } = require("../../controller/invoiceController")
const { protectRoute } = require("../../controller/authcontroller")
let invoiceRouter = express.Router();

invoiceRouter
    .route("/")
    .get(protectRoute, getInvoice)
    .post(protectRoute, postInvoice);



module.exports = invoiceRouter;
