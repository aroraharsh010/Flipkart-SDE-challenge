const express = require("express");
const { postInvoice, getInvoice, updateInvoice, deleteInvoice } = require("../../controller/invoiceController")
const { protectRoute } = require("../../controller/authcontroller")
let invoiceRouter = express.Router();

invoiceRouter
    .route("/")
    .get(protectRoute, getInvoice)
    .post(protectRoute, postInvoice);

invoiceRouter
    .route("/:id")
    .patch(protectRoute, updateInvoice)
    .delete(protectRoute, deleteInvoice);


module.exports = invoiceRouter;
