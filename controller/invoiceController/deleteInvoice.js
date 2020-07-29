const ValidationContract = require('../../utils/validator');
const InvoiceModel = require('../../model/invoicemodel');
const internalServerError = require('../../utils/internalServerError');

module.exports = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const contract = new ValidationContract();
    contract.isRequired(_id, 'id');
    if (!contract.isValid()) {
      return res.status(400).send({
        message: contract.errors(),
        status: 'Bad Request',
      });
    }
    const { _id: userId } = req.user;

    const temp = await InvoiceModel.findOneAndDelete({ _id, userId });
    return res.status(200).send({
      message: 'deleted',
      temp,
    });
  } catch (error) {
    console.log({ error });
    return internalServerError(res, error);
  }
};
