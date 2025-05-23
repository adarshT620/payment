const express=require("express");
const router=express.Router();
const zod=require("zod");
const {User}=require("../../db");
const {Account}=require("../../db");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");

const {authMiddleware}=require("../middleware"); 

const signupSchema=zod.object({
  username:zod.string().email(),
  firstName:zod.string(),
  lastName:zod.string(),
  password:zod.string()
})

router.post("/signup",async(req,res)=>{
  const{success}=signupSchema.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      msg:"Incorrect inputs"
    })
  }
  const existingUser=await User.findOne({
    username:req.body.username
  })
  if(existingUser){
    return res.status(411).json({
      msg:"Email already taken"
    })
  }
  const user=await User.create({
    username:req.body.username,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  })
  const userId=user._id;

  await Account.create({
    userId,
    balance:1+Math.random()*10000
  })
  
  const token=jwt.sign({
    userId
  },JWT_SECRET);
  res.json({
    msg:"User created successfully",
    token:token
  })
})

const signinSchema=zod.object({
  username:zod.string().email(),
  password:zod.string()
})

router.post("/signin",async(req,res)=>{
  const{success}=signinSchema.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      msg:"Incorrect inputs"
    })
  }
  const user=await User.findOne({
    username:req.body.username,
    password:req.body.password
  })
  if(user){
    const token=jwt.sign({
      userId:user._id
    },JWT_SECRET);

    res.status(200).json({
      token:token
    })
    return;
  }
  res.status(411).json({
    msg:"Error while logging in"
  })
})

const updateSchema=zod.object({
  password:zod.string().optional(),
  firstName:zod.string().optional(),
  lastName:zod.string().optional()
})

router.put("/",authMiddleware,async(req,res)=>{
  const {success}=updateSchema.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      msg:"Error while upadating credentials"
    })
  }
  await User.updateOne({_id:req.userId},req.body);
  res.json({
    msg:"Updated successfully"
  })
})

router.get("/bulk",authMiddleware,async(req,res)=>{
  const filter=req.query.filter || " ";
  const users=await User.find({
    _id: {$ne: req.userId},  // Exclude the logged-in user
    $or:[
      {firstName:{"$regex":filter,"$options":"i"}},
      {lastName:{"$regex":filter,"$options":"i"}}
    ]
  });

  res.json({
    user:users.map(user=> ({
      username:user.username,
      firstName:user.firstName,
      lastName:user.lastName,
      _id:user._id
    }))
  })
})

router.get("/me", authMiddleware, async(req,res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        msg: "User not found"
      });
    }
    res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports=router;