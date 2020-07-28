const mongoose = require("mongoose");
const invoiceschema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  invoice_number: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,

  },
  desc: {
    type: String,
    required: true,
  }
});

const InvoiceModel = mongoose.model("InvoiceModel", invoiceschema);
module.exports = InvoiceModel;
