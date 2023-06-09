const express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../module/User');
const fetchUser=require('../middleware/fetchUser');

const JWT_Sceret = 'UETIANS';

//ROUTE 1 : login User  Endpoint : /user/auth/createUser  No Login Required
const createUserChecks = (body) => [
  body('name').not().isEmpty(),
  body('email').not().isEmpty().isEmail(),
  body('password').not().isEmpty().isLength({ min: 6 })
]
router.post('/createUser', createUserChecks(body), async (req, res) => {
  const errors = validationResult(req);

  // check is any errors ocurs 
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  // check if any user present with the same username and password
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: 'User already present' });
  }
  //--------------------------------------------------------------------------------------------------------------
  //                                      Generate the Hash  
  var salt = await bcrypt.genSaltSync(10);
  var hash = await bcrypt.hashSync(req.body.password, salt);
  const Password = hash;
  //--------------------------------------------------------------------------------------------------------------
  try {
    const userDetails = UserModel({
      "name": req.body.name,
      "password": Password,
      "email": req.body.email
    });
    const sentData = {
      user: userDetails.id
    }
    var token = await jwt.sign(sentData, JWT_Sceret);
    userDetails.save();
    res.status(200).json({ authToken: token })
  }
  catch(error) {
    return res.status(500).json({ title: "Something has wrong on the server side",error:error });
  }
})


// ROUTE 2 : login User  Endpoint : /user/auth/login  No Login Required
const createLoginChecks = (body) => [
  body('email').isEmail(),
]
router.post('/login', createLoginChecks(body), async (req, res) => {
  // check is any errors ocurs 
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "OOPS ! Try again with the correct credentials" });
    }
    const isValidUser = bcrypt.compare(user.password, password);

    if (isValidUser) {
      // return res.status(200).json({ error: "Hurry ! Valid entry" });
      const sentData = {
        user: user.id
      }
      var token = jwt.sign(sentData, JWT_Sceret);
      return res.status(200).json({ authToken: token })
    }

    return res.status(400).json({ error: "Invalid Entry Try Again" });
  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})



//   ROUTE 3 : Get User Details  Endpoint : /user/auth/getUser required Login
router.post('/getUser', fetchUser, async (req, res) => {
  // check is any errors ocurs 
  try {
    const data=req.user;
    const user=await UserModel.findOne({_id:data});
    res.send(user);
  }
  catch(error){
    res.status(500).json({error:error})
  }
})

module.exports = router