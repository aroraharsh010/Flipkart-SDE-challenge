const ValidationContract = require('../../utils/validator')
const InvoiceModel = require('../../model/invoicemodel');

module.exports = async (req, res) => {
    const { _id: userId } = req.user;
    const {
        date,
        invoice_number,
        amount,
        desc,
        lines
    } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(date, "date");
    contract.isRequired(invoice_number, "invoice_number");
    contract.isRequired(amount, "amount");
    contract.isRequired(desc, "desc");
    contract.isRequired(lines, "lines");

    if (!contract.isValid()) {
        return res
            .status(400)
            .send({
                message: contract.errors(),
                status: 'Bad Request',
            })
    }
    let contractLine = new ValidationContract();
    const isLinesValid = lines.some(({ price, desc, qty }) => {
        /**
         * return false if wants to break
        */

        contractLine.isRequired(price, "each line require price");
        contractLine.isRequired(desc, "each line require desc");
        contractLine.isRequired(qty, "each line require qty");
        return contract.isValid();
    });

    if (isLinesValid) {
        const invoicePayload = {
            userId,
            ...req.body
        }

        const oldInvoice = await InvoiceModel.find({ invoice_number, userId });

        if (!oldInvoice.length) {
            const invoice = await InvoiceModel.create(invoicePayload);
            return res
                .status(201)
                .send({
                    message: 'Invoice Created',
                    invoice,
                })
        } else {
            return res
                .status(400)
                .send({
                    message: 'Invoice already exists with same invoice number',
                })
        }

    } else {
        return res
            .status(400)
            .send({
                message: contractLine.errors(),
                status: 'Bad Request',
            })
    }
}