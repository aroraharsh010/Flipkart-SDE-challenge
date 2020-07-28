module.exports.postInvoice = async (req, res) => {
    const { _id } = req.user;
    const {
        date,
        invoice_number,
        amount,
        desc,
        lines
    } = req.body
}