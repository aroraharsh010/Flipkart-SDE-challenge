const ValidationContract = require('../../utils/validator');
const InvoiceModel = require('../../model/invoicemodel');
const processInvoice = require('../../utils/processInvoice');

module.exports = async (req, res) => {
  const { _id: userId } = req.user;
  const { url } = req.body;
  const contract = new ValidationContract();
  contract.isRequired(url, 'url');
  if (!contract.isValid()) {
    return res.status(400).send({
      message: contract.errors(),
      status: 'Bad Request',
    });
  }
  const data=processInvoice.getInvoice();
  data.url=url;
  const invoicePayload = {
    userId,
    ...data,
  };
  const invoice = await InvoiceModel.create(invoicePayload);
  return res.status(201).send({
    message: 'Invoice Created',
    invoice,
  });
};
