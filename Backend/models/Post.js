const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    likes : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
        
            }
        ],
    author : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },
    authorName :{

        type : String,
        required : true,

    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model("Post", postSchema)