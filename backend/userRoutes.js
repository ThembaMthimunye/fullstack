const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });


let userRoutes = express.Router();

///Retrive all Users

userRoutes.route("/user").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("Data was not found");
  }
});
//Retrieve one user

userRoutes.route("/user/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Data was not found");
  }
});

///Create a user

// userRoutes.route("/user").post(async (req, res) => {
//     let db = database.getDb();
//   let hashedPassword =await bcrypt.hash(req.body.password, 10);
//   const matchEmail = await db.collection("users").findOne({ email: req.body.email });
//   if (matchEmail) {
//     res.json({ message: "The email is taken please use a different email" });
//   } else {
//     let mongoObject = {
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       joinDate: new Date(),
//       posts: [],
//     };

//     let data = await db.collection("users").insertOne(mongoObject);
//     res.json(data);
//   }
  
// });

userRoutes.route("/user").post(async (req, res) => {
    try {
      let db = database.getDb();
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      const matchEmail = await db.collection("users").findOne({ email: req.body.email });
      if (matchEmail) {
        return res.status(400).json({ message: "The email is taken please use a different email" });
      } else {
        let mongoObject = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          joinDate: new Date(),
          posts: [],
        };
        let data = await db.collection("users").insertOne(mongoObject);
        res.status(201).json(data);
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });


///Update One

userRoutes.route("/user/:id").put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      joinDate: req.body.joinDate,
      posts: req.body.posts,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

//Delete One

userRoutes.route("/user/:id").delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

///Login

userRoutes.route('/user/login').post(async(req,res)=>{
    let db=database.getDb()
    const user=await db.collection('users').findOne({email:req.body.email})
    if(user)
    {
            let confirmation=await bcrypt.compare(req.body.password,user.password)
            if(confirmation){
                const token = jwt.sign(
                    {user },
                    process.env.SECRETKEY,
                    { expiresIn: '1d' }
                );
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Could not Log In"})
            }
    }
    else{
        res.json({success:false,message:'User not found'})
    }
})

module.exports = userRoutes;
