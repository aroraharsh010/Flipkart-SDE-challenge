const express = require('express');
const {
  postInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  updateInvoiceStatus,
} = require('../../controller/invoiceController');
const { protectRoute } = require('../../controller/authcontroller');

const invoiceRouter = express.Router();

invoiceRouter.route('/').get(protectRoute, getInvoice).post(protectRoute, postInvoice);
invoiceRouter.route('/:id').patch(protectRoute, updateInvoice).delete(protectRoute, deleteInvoice);
invoiceRouter.route('/:id/:status').patch(protectRoute, updateInvoiceStatus);
module.exports = invoiceRouter;
