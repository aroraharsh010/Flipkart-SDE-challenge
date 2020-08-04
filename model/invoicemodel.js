const mongoose = require('mongoose');
const { modelEnumsOfInvoiceStatus } = require('../globalConstants');
const { emailId } = require('../utils/config');

const lineSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  gstRate:{
    type:Number,
  },
  qty: {
    type: Number,
    required: true,
  },
  pid:{
    type: String,
  },
  rate:{
    type:Number,
  }
});
const invoiceschema = new mongoose.Schema({
  cName:{
    type: String,
    required:true,
  },
  cAddress:{
    type: String,
  },
  cEmail:{
    type:String,
  },
  cGstIn:{
    type:String,
  },
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  invoice_number: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required:true,
  },
  desc: {
    type: String,
  },
  lines: [lineSchema],
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: modelEnumsOfInvoiceStatus,
    default: 'pending',
  },
  comment: {
    type: String,
    default: '',
  },
});

const InvoiceModel = mongoose.model('InvoiceModel', invoiceschema);
module.exports = InvoiceModel;
