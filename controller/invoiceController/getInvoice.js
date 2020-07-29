const InvoiceModel = require('../../model/invoicemodel');
const internalServerError = require("../../utils/internalServerError")
const paginator = require("../../utils/paginator")

module.exports = async (req, res) => {
    try {
        const { _id, role } = req.user;
        const isUserAdmin = role === "admin";

        const pagination = paginator.paginateQuery(req);

        let queryObj = {
            ...req.params,
        };
        if (!isUserAdmin) {
            queryObj.userId = _id
        };

        if (req.params._id) {
            queryObj.invoiceId = req.params._id;
        }

        const invoices = await InvoiceModel.find(queryObj).limit(pagination.limit);
        return res
            .status(200)
            .send({
                invoices,
                pagination
            })
    } catch (error) {
        return internalServerError(res, error)
    }
}