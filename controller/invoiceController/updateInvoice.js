const ValidationContract = require('../../utils/validator')
const InvoiceModel = require('../../model/invoicemodel')
const internalServerError = require('../../utils/internalServerError')

module.exports = async (req, res) => {
    try {
        const { id: _id } = req.params;
        let contract = new ValidationContract();
        contract.isRequired(_id, "id");
        if (!contract.isValid()) {
            return res
                .status(400)
                .send({
                    message: contract.errors(),
                    status: 'Bad Request',
                })
        } else {
            const { _id: userId, role } = req.user;
            if (role === "vendor") {
                const {
                    invoice_number,
                    date,
                } = req.body;

                let error = ""

                if (!!invoice_number) {
                    error = "Invoice number can't be updated"
                }

                if (!!date) {
                    error = "Date can't be updated"
                }

                if (error.length) {
                    return res
                        .status(400)
                        .send({
                            message: error,
                            status: 'Bad Request',
                        });
                } else {
                    /*not working needs help*/
                    const updatedInvoice = await InvoiceModel.findOneAndUpdate(
                        { _id, userId },
                        { $set: req.body },
                        { new: true }
                    );
                    return res.status(200).send({
                        message: "Updated",
                        invoice: updatedInvoice
                    })
                }

            } else {
                return res
                    .status(400)
                    .send({
                        message: "Only Vendors can update there invoices",
                        status: 'Bad Request',
                    })
            }
        }
    } catch (error) {
        console.log({ error })
        return internalServerError(res, error)
    }
}