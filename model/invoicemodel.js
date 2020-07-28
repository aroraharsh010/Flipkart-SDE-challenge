const mongoose = require("mongoose");

const lineSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
})
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
  },
  lines: [lineSchema]
});

const InvoiceModel = mongoose.model("InvoiceModel", invoiceschema);
module.exports = InvoiceModel;
