const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = ()=>{

    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // connectTimeoutMS: 30000,
    })
    .then(()=>{
        console.log("DB is Connected Successfully")
    })
    .catch((error)=>{
        console.log(error);
    })
}

module.exports = dbConnect;