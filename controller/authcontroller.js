const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserModel = require('../model/usermodel');

const secret = 'secretKey';
const { sendEmail } = require('../utils/email');
const internalServerError = require('../utils/internalServerError');

module.exports.authorizeeasy = (req, res, next) => {
  if (req.headers.role === 'admin' || req.headers.role === 'writer') {
    next();
  } else {
    res.end('user is not authorized');
  }
};
module.exports.authorize = (...args) => {
  const roles = args;
  return (req, res, next) =>
    roles.includes(req.headers.role)
      ? next()
      : res.status(400).send({ message: 'user is not authorized' });
};

module.exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    if (!email || !password) {
      res.end('Email or Password is not present!');
      return;
    }
    const userData = await UserModel.findOne({
      email,
    });
    if (!userData) {
      res.end('User Not Found!');
      return;
    }
    const dbPassword = userData.password;
    const ans = await bcrypt.compare(password, dbPassword);
    if (!ans) {
      res.end('Wrong Password!');
      return;
    }
    const JWTtoken = jsonwebtoken.sign({ result: userData._id }, secret);
    // eslint-disable-next-line consistent-return
    return res.status(201).send({
      status: 'Success Login',
      token: JWTtoken,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line consistent-return
    return internalServerError(res, error);
  }
};
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    // 1. check token exist's or not
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log(token);
      // 2. verify the token
      const decode = jsonwebtoken.verify(token, secret);
      if (!decode) {
        // res.end("User is not authenticated");
        return next();
      }
      console.log(decode);
      // 3. check that user associated with the token exist in db or not
      // user name:steve
      // role:admin
      const user = await UserModel.findById(decode.id);
      if (!user) {
        // res.end("user does not exist");
        return next();
      }
      // 4. password update
      // db => ADMIN,User
      // authorize
      req.headers.role = user.role;
      // pug file
      res.locals.user = user;
      return next();
    }
    return next();
  } catch (err) {
    res.json(err);
    // console.log(err);
    return next();
  }
};
module.exports.logoutUser = async (req, res) => {
  res.cookie('jwt', 'Logged Out', {
    expires: new Date(Date.now() + 20),
    httpOnly: true,
  });
  res.status(201).json({
    status: 'Success LogOut',
    message: 'User Logged Out',
  });
};
module.exports.userSignUp = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    if (!email || !password) {
      res.end('Email or Password is not present!');
    }
    const oldUser = await UserModel.find({ email });
    if (oldUser.length) {
      return res.status(400).send({
        message: 'User already exists',
      });
    }
    const user = await UserModel.create({
      ...req.body,
      password :  await bcrypt.hash(password, 10)
    });
    const token = jsonwebtoken.sign({ result: user._id }, secret, {
      expiresIn: '10d',
    });

    return res.status(201).send({
      status: 'Success SignUp',
      token,
      user,
    });
  } catch (error) {
    return res.status(501).send({ message: error });
  }
};
module.exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      [token] = req.headers.authorization.split(' ');
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      res.end('User is not logged in ');
    }
    try {
      const decode = jsonwebtoken.verify(token, secret);
      const user = await UserModel.findById(decode.result);
      if (!user) {
        res.end('user does not exist');
      }
      req.headers.role = user.role;
      req.headers.user = user;
      res.locals.user = user;
      req.user = user;
      next();
      return 0;
    } catch (error) {
      console.log({ error });
      return res.status(400).send({ message: 'User is not authenticated', error });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error', error });
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.end('Please enter your email id');
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.end('User not found');
  }
  const token = user.createResetToken();
  await user.save({ validateBeforeSave: false });
  const message = `Your reset token is sent! Please visit /createPassword and change password using provided token \n Your token:${token}`;
  try {
    sendEmail({
      receiverId: user.email,
      message,
      subject: 'Token only valid for 10mins',
    });
    res.json({
      status: 'Email Sent',
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.resetPassword = async (req, res) => {
  // 1. get Token from user
  console.log(req.body);
  const { token } = req.body;
  if (!token) {
    res.end('Enter token');
  }

  const encryptedToken = crypto.createHash('sha256').update(token).digest('hex');
  // 2. verify token
  console.log(encryptedToken);
  const user = await UserModel.findOne({ resetToken: encryptedToken });
  if (!user) {
    res.end('Invalid Auth token');
    return;
  }
  // 3. Update password
  console.log(user);
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetToken = undefined;
  user.expiresIn = undefined;
  user.save();
  res.json({
    status: 'User Password Updated',
  });
};
module.exports.updateMyPassword = async (req, res) => {
  //  currentPassword,NewPassword,confirmPassword
  console.log(req.body);
  const dbPassword = req.headers.user.password;
  // ui

  const password = req.body.currentPassword;
  console.log(`${dbPassword} ${password}`);
  // db
  const { user } = req.headers;
  const ans = await bcrypt.compare(`${password}`, dbPassword);
  if (!ans) {
    // new Error("Password was wrong")
    res.end('password is wrong');
    return;
  }
  //  model user password update
  console.log(user);
  user.password = req.body.NewPassword;
  user.confirmPassword = req.body.confirmPassword;
  // validators
  user.save();
  // send tokens
  // const JWTtoken = jsonwebtoken.sign({ id: user._id }, secret, {
  //   expiresIn: "10d"
  // });
  // res.cookie("jwt", JWTtoken, { httpOnly: "true" });
  res.json({
    status: 'user Password Updated',
  });
};
