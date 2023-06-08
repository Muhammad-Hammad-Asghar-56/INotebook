const express = require('express')
const { body, validationResult } = require('express-validator');
const fetchUser=require('../middleware/fetchUser');
const router = express.Router();

const createUserChecks = (body) => [
  body('name').not().isEmpty(),
  body('email').not().isEmpty().isEmail(),
  body('password').not().isEmpty().isLength({ min: 6 })
]
//   ROUTE 1 : Add New Note Details  Endpoint : /user/auth/addNote required Login
router.post('/addNote', fetchUser, async (req, res) => {
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