const express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../module/User');
const fetchUser = require('../middleware/fetchUser');
const sendMail = require('../sendMail');

const JWT_Sceret = 'UETIANS';

//ROUTE 1 : login User  Endpoint : /user/auth/createUser  No Login Required
const createUserChecks = (body) => [
  body('name').isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]
router.post('/createUser', createUserChecks(body), async (req, res) => {
  const errors = validationResult(req);
  const sucess = false;

  // check is any errors ocurs 
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucess: sucess, error: errors.array() });
  }

  // check if any user present with the same username and password
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ sucess: sucess, error: 'User already present' });
  }

  var salt = await bcrypt.genSaltSync(10);
  var hash = await bcrypt.hashSync(req.body.password, salt);
  const Password = hash;

  try {
    const userDetails = UserModel({
      "name": req.body.name,
      "password": Password,
      "email": req.body.email
    });
    const sentData = {
      user: userDetails.id
    }
    var token = jwt.sign(sentData, JWT_Sceret);
    userDetails.save();
    sucess = true;
    res.status(200).json({ sucess: sucess, authToken: token })
  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", sucess: sucess, error: error });
  }
})


// ROUTE 2 : login User  Endpoint : /user/auth/login  No Login Required
const createLoginChecks = (body) => [
  body('email').isEmail()
]
router.post('/login', createLoginChecks(body), async (req, res) => {
  // check is any errors ocurs 
  let sucess = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ title: "Invalid email", sucess: sucess, error: errors.array() });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "OOPS ! Try again with the correct credentials", sucess: sucess });
    }
    const isValidUser = bcrypt.compare(user.password, password);

    if (isValidUser) {
      // return res.status(200).json({ error: "Hurry ! Valid entry" });
      const sentData = {
        user: user.id
      }
      var token = jwt.sign(sentData, JWT_Sceret);
      sucess = true;

      return res.status(200).json({ sucess: sucess, authToken: token })
    }

    return res.status(400).json({ sucess: sucess, error: "Invalid Entry Try Again" });
  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})



//   ROUTE 3 : Get User Details  Endpoint : /user/auth/getUser required Login
router.post('/getUser', fetchUser, async (req, res) => {
  // check is any errors ocurs 
  try {
    const data = req.user;
    const user = await UserModel.findOne({ _id: data });
    res.send(user);
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
})


//   ROUTE 4 : Send the auth-token to email Endppoint: /user/auth/send/authToken
router.get('/send/authToken', async (req, res) => {
  try {
    const userDetails = await UserModel.findOne({ email: req.body.email });
    if (!userDetails) {
      return res.status({ sucess: "false", error: "enter the correct email" });
    }
    const sentData = {
      user: userDetails.id
    }
    var token = jwt.sign(sentData, JWT_Sceret);
    userDetails.save();
    sucess = true;
    const subject = `HI your Link for changing the https://Localhost:3000/ForgetPassword/${req.body.email}/${token}`;
    // sendMail(req.body.email, "Forget Password", subject)
    sendMail("hammadasgharmuhammad@gmail.com", "Forget Password", subject)
    res.status(200).json({ sucess: sucess })
  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", sucess: sucess, error: error });
  }
})


//   ROUTE 5 : Send the auth-token to email Endppoint: /user/auth/send/authToken
const updateUserPassChecks = (body) => [
  body('password').isLength({ min: 6 }),
  body('authToken').isEmpty()
]
router.get('/update/password', fetchUser, updateUserPassChecks, async (req, res) => {
  const errors = validationResult(req);
  const sucess = false;

  if (!errors.isEmpty()) { return res.status(400).json({ sucess, error: errors }) }

  try {
    const user = req.user;
    // const userDetails = await UserModel.findOne({ email: req.body.email });
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(req.body.password, salt);
    const Password = hash;
    const userDetails = await UserModel.findOneAndUpdate({ _id: user._id }, { password: Password }, { returnDocument: 'after' });
    sucess = true;
    res.status(200).json({ sucess: sucess,message:"Password has been changed"});
  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", sucess: sucess, error: error });
  }
})

module.exports = router