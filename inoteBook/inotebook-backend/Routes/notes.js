const express = require('express')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const NoteModel = require('../module/Notes');
const UserModel = require('../module/User');
const router = express.Router();

const createNotesChecks = (body) => [
  body('title').not().isEmpty().isLength({ min: 6 }),
  body('description').not().isEmpty().isLength({ min: 6 }),
  body('tag').not().isEmpty()
]
//   ROUTE 1 : Add New Note Details  Endpoint : /note/addNote required Login
router.post('/addNote', fetchUser, createNotesChecks(body), async (req, res) => {
  // check is any errors ocurs 
  try {
    const data = req.user;
    const userData = await UserModel.findOne({ _id: data });

    const { title, description, tag } = req.body;

    const noteDetails = NoteModel({
      user: userData.id,
      title: title,
      description: description,
      tag: tag
    });
    noteDetails.save();
    res.status(200).json({ noteDetails })

  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})



//   ROUTE 2 : Get all Notes of User Details  Endpoint : /note/getNotes required Login
router.get('/getNotes', fetchUser, createNotesChecks(body), async (req, res) => {
  // check is any errors ocurs 
  try {
    const userData = await NoteModel.find({ user: req.user });
    res.status(200).json(userData);

  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})

//   ROUTE 3 : Delete any one Notes of User Details  Endpoint : /note/getNotes required Login
router.delete('/deleteNote/:noteID', fetchUser, async (req, res) => {
  // check is any errors ocurs 
  try {
    await NoteModel.deleteOne({ _id:  req.params.noteID, user: req.user });
    res.status(200).json({ title: "Succevily Deleted" });

  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})


//   ROUTE 4 : Update Notes of User   Endpoint : /note/updateNoteOnID required Login
router.put('/updateNoteOnID/:noteID', fetchUser, createNotesChecks(body), async (req, res) => {
  // check is any errors ocurs 
  // try {
    const { title, description, tag } = req.body;
    const newDetailNote = await NoteModel.findOneAndUpdate({ _id: req.params.noteID, user: req.user }, { title: title, description: description, tag: tag }, { returnDocument: 'after' });
    if (!newDetailNote) {
      return res.status(401).json("Access Denied");
      
    }
    res.status(200).json({ title: "Succevily Update", Note: newDetailNote });
  // }
  // catch (error) {
  //   return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  // }
})



//   ROUTE 5 : Get One Notes of User Details  Endpoint : /note/getNotes required Login
router.get('/getNote/:id', fetchUser, createNotesChecks(body), async (req, res) => {
  // check is any errors ocurs 
  try {
    const userData = await NoteModel.find({ _id:req.params.id,user: req.user });
    res.status(200).json(userData);

  }
  catch (error) {
    return res.status(500).json({ title: "Something has wrong on the server side", error: error });
  }
})

module.exports = router