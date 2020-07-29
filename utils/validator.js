let error = '';

function ValidationContract() {
  this.clear();
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) error = `${message} is required`;
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min) error = `${message} must have minimum length of ${min}`;
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) error = `${message} must have maximum length of ${max}`;
};

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (value.length !== len) error = `${message} must have fixed length of ${len}`;
};

ValidationContract.prototype.isEmail = (value, message) => {
  const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) error = `${message} is mot an email`;
};

ValidationContract.prototype.errors = () => {
  return error;
};

ValidationContract.prototype.clear = () => {
  error = '';
};

ValidationContract.prototype.isValid = () => {
  return error.length === 0;
};

module.exports = ValidationContract;
