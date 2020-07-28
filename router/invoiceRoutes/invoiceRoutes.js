const express = require("express");
const { postInvoice, getInvoice, updateInvoice } = require("../../controller/invoiceController")
const { protectRoute } = require("../../controller/authcontroller")
let invoiceRouter = express.Router();

invoiceRouter
    .route("/")
    .get(protectRoute, getInvoice)
    .post(protectRoute, postInvoice);

invoiceRouter
    .route("/:id")
    .patch(protectRoute, updateInvoice);


module.exports = invoiceRouter;
