const express = require('express')
const connectMongoose = require('./db');
const user=require('./Routes/auth');
const inotbook = require('./Routes/notes');
const app = express()

app.use(express.json())
const port=3000;

app.use('/user/auth',user);
app.use('/note',inotbook);


app.listen(3000,()=> {
    connectMongoose();
    console.log('listening on port on http://localhost:'+port+'/');
})