const express = require("express");
const database = require("./connect");
const ObjectId=require('mongodb').ObjectId
const jwt=require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });


let postRoutes = express.Router();

///Retrive all posts

postRoutes.route("/post").get(verifyToken,  async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    res.json(data)
  } else {
    throw new Error("Data was not found")
  }
});
//Retrieve one Post


postRoutes.route('/post/:id').get(verifyToken,  async(req,res)=>{
    let db=database.getDb();
    let data=await db.collection("posts").findOne(({_id:new ObjectId(req.params.id)}))
    if(Object.keys(data).length>0){
        res.json(data)
    }else{
        throw new Error("Data was not found")
    }
})


///Create a post 

postRoutes.route('/posts').post(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let mongoObject={
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.author,
        dateCreated:req.body.dateCreated,
        imageId:request.body.imageId
    }

    let data =await db.collection("posts").insertOne(mongoObject)
    res.json(data)
})


///Update One

postRoutes.route('/post/:id').put(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let mongoObject={
        $set:{
            title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.user._id,
        dateCreated:req.body.dateCreated,
        imageId:request.body.imageId
        }
    }
    let data=await db.collection('posts').updateOne({_id:new ObjectId(req.params.id)},mongoObject)
    res.json(data)
})

//Delete One

postRoutes.route('/post/:id').delete(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let data=await db.collection('posts').deleteOne({_id:new ObjectId(req.params.id)})
    res.json(data)
})


//     //    //   //      //
///// //    //   //      // 
//   //   //    //   //      // 
function verifyToken(req,res,next){
    const authHeaders=req.headers['authorization']
    const token=authHeaders&&authHeaders.split(' ')[1]
    if(!token){
         return res.status(401).json({message:"Authentication  token missing "})
     }
       jwt.verify(token,process.env.SECRETKEY,(error,user)=>{
         if(error){
             return res.status(403).json({message:"invalid token "})
         }

        req.body.user=user
         next()
     })
}
module.exports=postRoutes