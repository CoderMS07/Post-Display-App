const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    image: String,
    caption: String
})

const postModel=mongoose.model("post", postSchema)

module.exports=postModel;

/*
    const postModel=mongoose.model("post", postSchema)
    - In this line "post" is just a name to the collection we can give whatever we want.
*/