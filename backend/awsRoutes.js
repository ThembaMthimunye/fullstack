const express = require("express");
const database = require("./connect");
const ObjectId=require('mongodb').ObjectId
const jwt=require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });
let awsRoutes = express.Router();


const {S3Client ,PutObjectCommand,GetObjectCommand,DeleteObjectCommand}=require('@aws-sdk/client-s3')

//Retrieve one Post
const S3bucket="thembastorage"
const s3Client=new S3Client({
    region:'us-east-2',
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    }
})

awsRoutes.route('/images/:id').get(verifyToken,  async(req,res)=>{
    const id=req.params.id
    const bucketParams=({
        Bucket:S3bucket,
        Key:id,
    })
    const data=await s3Client.send(new GetObjectCommand(bucketParams))

    const contentType=data.ContentType
    srcString=await data.Body.transformToString('base64')
    const imageSource=`data:${contentType};base64,${srcString}`

    res.json(imageSource)
})


///Create a post 

awsRoutes.route('/images').post(verifyToken, async(req,res)=>{
    const file=req.files[0]
    const bucketParams={
        Bucket:S3bucket,
        Key:file.originalname,
        Body:file.buffer
    }
        const data=await s3Client.send(new PutObjectCommand(bucketParams))
    res.json(data)
})



//Delete One

// awsRoutes.route('/images/:id').delete(verifyToken, async(req,res)=>{
//     let db=database.getDb();
//     let data=await db.collection('posts').deleteOne({_id:new ObjectId(req.params.id)})
//     res.json(data)
// })



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
module.exports=awsRoutes