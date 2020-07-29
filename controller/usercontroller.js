const UserModel = require('../model/usermodel');

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (req.headers.user._id !== id && req.headers.user.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorised request',
    });
  }
  try {
    const result = await UserModel.findByIdAndDelete(id);
    res.status(201).json({
      ans: result,
    });
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      status: 'bad request',
    });
  }
};
// 107200070451652
module.exports.getUser = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  try {
    const result = await UserModel.findById(id);
    // var result = await UserModel.find({_id:id});
    res.status(201).json({
      ans: result,
    });
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      status: 'bad request',
    });
  }
};
module.exports.getAllUser = async (req, res) => {
  try {
    const { query } = req;
    // value
    let queryObj = { ...query };
    // // filter parameters=> sort,pagination,filter,limit
    const ExcludefromQuery = ['filter', 'limit', 'page', 'sort'];

    ExcludefromQuery.map((exclude) => queryObj[exclude])
    let queryString = JSON.stringify(queryObj);
    // // /\b(gt|gte|lte|lt)\b/g

    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => match)
    queryObj = JSON.parse(queryString);
    let result = UserModel.find(queryObj);
    if (query.sort) {
      const args = query.sort.split('%').join(' ');
      result = result.sort(args);
    }
    if (query.filter) {
      const args = query.filter.split(',').join(' ');
      result = result.select(args);
    } else {
      result = result.select('-__v');
    }
    const limit = Number(query.limit) || 2;
    const page = Number(query.page) || 1;

    const ElementToskip = (page - 1) * limit;
    result = result.skip(ElementToskip).limit(limit);
    const finalresult = await result;

    return res.status(200).json({
      result: finalresult,
    });
  } catch (err) {
    return res.status(401).json({
      response: 'data not found',
      err,
    });
  }
};
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (String(req.headers.user._id) !== String(id) && req.headers.user.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorised request',
    });
    return;
  }
  delete req.body.role;
  try {
    // name:steve
    // name:stevenson
    const result = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    // console.log(result);
    res.status(201).json({ status: 'User data updated', result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports.createUser = async (req, res) => {
  req.body.role = 'user';
  try {
    // request
    const result = await UserModel.create(req.body);
    res.status(201).json({
      ans: result,
    });
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      status: err,
    });
  }
};
