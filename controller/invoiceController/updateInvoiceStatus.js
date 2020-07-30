const InvoiceModel = require('../../model/invoicemodel');
const internalServerError = require('../../utils/internalServerError');

const { modelEnumsOfInvoiceStatus } = require("../../globalConstants");

const STATUS_OPTIONS = modelEnumsOfInvoiceStatus.filter(options => options !== "pending");

module.exports = async (req, res) => {
    try {
        const { role } = req.user;
        const isUserAdmin = role === 'admin'
        if (isUserAdmin) {
            const { id: _id, status } = req.params;
            const isStatusOptionValid = STATUS_OPTIONS.includes[status];
            if (isStatusOptionValid) {
                const isStatusChangeRequested = status === 'changeRequested';
                if (isStatusChangeRequested) {
                    const { note } = req.body;
                    const noteIsNotValid = !(note && note.trim().length)
                    if (noteIsNotValid) {
                        return res.status(400).send({
                            error: `In order to request change, notes is compulsary`
                        })
                    }
                }
                const statusOfTheInvoice = await InvoiceModel.findById(_id).select('status')
                const isAlreadyAcceptedOrRejected = STATUS_OPTIONS.filter(options => options !== 'changeRequested').includes(statusOfTheInvoice);

                if (isAlreadyAcceptedOrRejected) {
                    return res.status(400).send({
                        error: `The status of the invoice is: ${statusOfTheInvoice}, hence it can't be changed any further`
                    })
                }

                const updatedInvoice = await InvoiceModel.findOneAndUpdate(
                    { _id },
                    { $set: { status, ...req.body } },
                    { new: true },
                );
                return res.status(200).send({
                    message: 'Updated',
                    invoice: updatedInvoice,
                });
            }
            return res.status(400).send({
                error: `Status can be only be either of following ${STATUS_OPTIONS.join()}`
            })
        }
        return res.status(401).send({
            error: `Only Admin user can change the status of the invoice`
        })

    } catch (error) {
        return internalServerError(res, error)
    }

}