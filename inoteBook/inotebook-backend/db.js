const mongoose = require('mongoose');

const mongoosURL="mongodb://localhost:27017/test"
const connectMongoose = async ()=>{
    // mongoose.connect(mongoosURL,()=> {
    //     console.log('connect to mongodb successfully');
    // })
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('connect to mongodb successfully');
}
module.exports= connectMongoose;