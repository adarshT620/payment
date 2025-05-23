const express=require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../../db");

const router=express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
  const account=await Account.findOne({
    userId:req.userId 
  })
  res.status(200).json({
    balance:account.balance
  })
})

// //Bad way of doing transactions...

router.post("/transfer",authMiddleware,async(req,res)=>{
  const {amount,to}=req.body;
   const account=await Account.findOne({
    userId:req.userId 
  })
  if(account.balance<amount || amount<0){
    return res.status(400).json({
      msg:"Insufficient Balance"
    })
  }
  const toAccount=await Account.findOne({
    userId:to
  })
  if(!toAccount){
    return res.status(400).json({
      msg:"Account does not exist"
    })
  }
  await Account.updateOne({
    userId:req.userId 
  },{
    $inc:{
      balance:-amount 
    }
  })
  await Account.updateOne({
    userId:to
  },{
    $inc:{
      balance:amount
    }
  })
  res.json({
    msg:"Transaction successful"
  })
})

// Good way of doing transactions is using Transaction in mongodb...

// router.post("/transfer",authMiddleware,async(req,res)=>{
//   const session=await mongoose.startSession();
//   session.startTransaction();

//   const {amount,to}=req.body;
  
//   const account=await Account.findOne({
//     userId:req.userId
//   }).session(session);

//   if(!account || account.balance<amount){
//     await session.abortTransaction();
//     return res.status(400).json({
//       msg:"Insufficient balance"
//     })
//   }

//   const toAccount=await Account.findOne({
//     userId:to
//   }).session(session);

//   if(!toAccount){
//     await session.abortTransaction();
//     return res.status(400).json({
//       msg:"Account does not exist"
//     })
//   }

//   await Account.updateOne({
//     userId:req.userId
//   },{
//     $inc:{
//       balance:-amount 
//     }
//   }).session(session);

//   await Account.updateOne({
//     userId:to 
//   },{
//     $inc:{
//       balance:amount 
//     }
//   }).session(session);

//   await session.commitTransaction();
//   res.json({
//     msg:"Transaction successful"
//   })
// })

module.exports=router;