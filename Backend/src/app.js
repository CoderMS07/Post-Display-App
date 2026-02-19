const express=require('express');
const multer=require('multer');
const uploadFile=require('./services/storage.service')
const postModel=require('./model/post.model')
const cors=require('cors');

const app=express();
const upload=multer({storage: multer.memoryStorage()})
app.use(cors());
app.use(express.json());

// POST API
app.post('/create-post', upload.single("image"), async (req,res)=>{ 

    // upload image to the ImageKit
    const result=await uploadFile(req.file.buffer)

    // added to the mongoDB database 
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message:"Post created successfully",
        post
    })
})


// GET API
app.get('/posts',async (req,res)=>{
    const posts = await postModel.find(); 

    return res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
})


module.exports=app;