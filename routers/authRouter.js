const express= require('express');
// const { findOne } = require('../models/userModel');

const authRouter=express.Router();
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY = 'dhvsaldkbv3adf';

authRouter
    .route('/signup')
    .get(middleware1,getSignUp,middleware2)
    .post(postSignup)
authRouter
    .route('/login')
    .post(loginUser)
    
function middleware1(req,res,next){
    console.log('middleware1 encounterd');
    next();
}
function middleware2(req,res,next){
    console.log('middleware2 encounterd');
    res.sendFile('./public/index.html',{root:__dirname});
}

function getSignUp(req,res,next){
    console.log('get signup called');
    next();
   // res.sendFile('/public/index.html',{root:__dirname});
}

async function postSignup(req,res){
    let obj=req.body;
    let user=await userModel.create(obj);
    console.log('backend',user);
    res.json({
        message:"user signed up",
        data:user
    })
    //res.json({message:"user signed up",data:obj}); 
}

async function loginUser(req,res){

try{
    let data=req.body;
    let user=await userModel.findOne({email:data.email});
    if(user){
        //bcrypt -> compare
        if(user.password==data.password){
            let uid=user['_id']; //uid
            let token=jwt.sign({payload:uid},JWT_KEY);
           res.cookie('login',token,{httpOnly:true});
            return res.json({
                message:'user has logged in',
                UserDetails:user
            });
        }
        else{
          return  res.json({
                message:"wrong credentials"
            });
        }
    }
    else{
        return res.json({message:'user not found'});
    }
}catch(err){
    return res.json({message:err});
}}
module.exports=authRouter