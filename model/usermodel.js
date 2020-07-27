const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
let {dbpass}=require("../utils/config");
const DB =
  "";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true 
  })
  .then(conn => {
    console.log("Connected to Users DB!");
  });

//schema=>Set Of Rules
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: validator.isAlpha
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  role: {
    type: String,
    required:true,
    enum: ["admin", "vendor"],
    default: "vendor"
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    validate: function() {
      return this.confirmPassword === this.password;
    }
  },
  resetToken: String,
  expiresIn: Date
});
userschema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});
userschema.methods.createResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.expiresIn = Date.now() + 1000 * 60 * 10; //10mins expiry time
  return resetToken;
};
const UserModel = mongoose.model("UserModel", userschema);

module.exports = UserModel;
