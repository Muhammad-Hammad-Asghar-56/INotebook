const express = require('express')
const connectMongoose = require('./db');
const user=require('./Routes/auth');
const inotbook = require('./Routes/notes');
const app = express()

app.use(express.json())
const port=5000;

app.use('/user/auth',user);
app.use('/note',inotbook);


app.listen(port,()=> {
    connectMongoose();
    console.log('listening on port on http://localhost:'+port+'/');
})