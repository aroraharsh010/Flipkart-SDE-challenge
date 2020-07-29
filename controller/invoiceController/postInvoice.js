const ValidationContract = require('../../utils/validator');
const InvoiceModel = require('../../model/invoicemodel');
const internalServerError = require('../../utils/internalServerError');

module.exports = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { date, invoice_number, amount, desc, lines, url } = req.body;

    const contract = new ValidationContract();
    contract.isRequired(date, 'date');
    contract.isRequired(url, 'url');
    contract.isRequired(invoice_number, 'invoice_number');
    contract.isRequired(amount, 'amount');
    contract.isRequired(desc, 'desc');
    contract.isRequired(lines, 'lines');

    if (!contract.isValid()) {
      return res.status(400).send({
        message: contract.errors(),
        status: 'Bad Request',
      });
    }
    const contractLine = new ValidationContract();
    const isLinesValid = lines.some(({ price, desc: descLine, qty }) => {
      contractLine.isRequired(price, 'each line require price');
      contractLine.isRequired(descLine, 'each line require desc');
      contractLine.isRequired(qty, 'each line require qty');
      return contract.isValid();
    });

    if (isLinesValid) {
      const oldInvoice = await InvoiceModel.find({ invoice_number, userId });
      if (!oldInvoice.length) {
        const invoicePayload = {
          userId,
          ...req.body,
        };
        const invoice = await InvoiceModel.create(invoicePayload);
        return res.status(201).send({
          message: 'Invoice Created',
          invoice,
        });
      }
      return res.status(400).send({
        message: 'Invoice already exists with same invoice number',
      });
    }
    return res.status(400).send({
      message: contractLine.errors(),
      status: 'Bad Request',
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};
