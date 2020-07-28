const InvoiceModel = require('../../model/invoicemodel');
const internalServerError = require("../../utils/internalServerError")
module.exports = async (req, res) => {
    try {
        const { _id, role } = req.user;
        const isUserAdmin = role === "admin";
        let queryObj = {
            ...req.params,
            invoiceId: req.params._id
        };

        if (!isUserAdmin) {
            queryObj.userId = _id
        };

        const invoices = await InvoiceModel.find(queryObj);
        return res
            .status(200)
            .send({
                invoices,
            })
    } catch (error) {
        return internalServerError(res, error)
    }
}