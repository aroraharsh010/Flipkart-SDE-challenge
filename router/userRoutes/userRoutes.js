const express = require('express');

const userRouter = express.Router();
const { updateUser, deleteUser, getUser, getAllUser } = require('../../controller/usercontroller');
const {
  loginUser,
  userSignUp,
  protectRoute,
  logoutUser,
} = require('../../controller/authcontroller');
// handler
// routers
userRouter.route('').get(getAllUser);
// authentication routes
// resource
userRouter.route('/login').post(loginUser);
userRouter.route('/signup').post(userSignUp);
userRouter.route('/logout').get(logoutUser);

userRouter
  .route('/:id')
  .get(protectRoute, getUser)
  // req=>updateUser=>// admin
  .patch(protectRoute, updateUser)
  .delete(protectRoute, deleteUser);
module.exports = userRouter;
