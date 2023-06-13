const express = require('express')
const connectMongoose = require('./db');
const user=require('./Routes/auth');
const inotbook = require('./Routes/notes');
var cors = require('cors');
const sendMail = require('./sendMail');


const app = express()


app.use(express.json())
app.use(cors())
const port=5000;

app.use('/user/auth',user);
app.use('/note',inotbook);


app.listen(port,()=> {
    connectMongoose();
    console.log('listening on port on http://localhost:'+port+'/');
})