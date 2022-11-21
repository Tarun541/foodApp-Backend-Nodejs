

const userModel=require('../models/userModel');

const jwt=require('jsonwebtoken');

const JWT_KEY='dhvsaldkbv3adf';

module.exports.signup=async function signup(req,res){
    try{
        let dataObj=req.body;
        console.log(dataObj);
        let user=await userModel.create(dataObj);
        if(user){
            return res.json({message:"user signed Up",data:user});

        }
        else{
            res.json({message:'error while signing app'});
        }
    }catch(err){
        res.json({message:err.message});
    }
}

module.exports.login=async function login(req,res){
    try{
    let data=req.body;
    let user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password==data.password){
            let uid=user['_id'];
            let token=jwt.sign({payload:uid},JWT_KEY);
            res.cookie('login',token,{httpOnly:true});
            return res.json({
                message:'user has loggged in',
                userDetails:user
            });

        }
        else{
            return res.json({message:"incorrect credentials"});

        }
    }
    else{
        return res.json({message:'user not found'});
    }}catch(err){
        res.json({message:err.message});
    }
}

//isAuthorized  to check the user role(admin,user,deliverBoy...)

module.exports.isAuthorised= function isAuthorised(roles){
    return function(req,res,next){

        if(roles.includes(req.designation)==true){
            next();
            
    }
        else{
            res.json(
                {
                message:"operation not allowed"
                }
            )
        }
}}


module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
    let token;
    if(req.cookies.login){
        //console.log(req.cookies);
        token=req.cookies.login;
        let payload=jwt.verify(token,JWT_KEY);
       // console.log('payload token',payload);
        if(payload){
        const user=await userModel.findById(payload.payload);
        req.designation=user.designation;
        req.id=user.id;
        next();}
        else{
            return res.json({message:'user not verified'});
    
        }}
        else{
            return res.json({message:'try login again!'});
        }
    }catch(err)
    {
       return res.json({message:err.message});
    }
}

module.exports.forgetpassword=async function forgetpassword(res,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            //createResetToken is used to create new token
            const resetToken=user.createResetToken();
             //  http://abc.com/resetpassword/resetToken
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
            //send email to the user- nodemailer

         }
         else{
            return res.json({message:'please signup'})
         }
    }
    catch(err){
        res.json({message:'please sign up'});
    }
}

module.exports.resetpassword=async function resetpassword(req,res){
    try{
        const token=req.params.token;
    let {password,confirmPassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    if(user){
        //reset password handler will update users passwprd in db
        user.resetPasswordHandler(password,confirmPassword);
        await user.save();
        res.json({
            message:'password changed succesfully'
        })
    }
    else{
        res.json({message:'user not found'});
    }
    }
    catch(err){
        return res.json({message:err.message});
    }
}

module.exports.logout=function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({message:'user logged out sucessfully'});
}