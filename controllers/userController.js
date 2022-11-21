
const userModel=require('../models/userModel');
module.exports.getUser=async function getUser(req,res){
    let id=req.id;
    let user=await userModel.findById(id);
   // let User=await userModel.findOne({name:'joey'});
   if(user){
    return res.json(user)
   }
   else{
    res.json({message:'user not found'});
}};

module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received succesfully",
        user:req.body
    });
}

module.exports.updateUser=async function updateUser(req,res){
    try{
    let id=req.params.id;
    let user=await userModel.findById(id);
    let dataToBeUpdated=req.body;
    if(user){
        const keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataToBeUpdated[keys[i]];
        }
        const updatedData=await user.save(); 
        res.json({
            message:'data updated succesfully',
            data:updatedData
        })
    }
    else{
        res.json({message:'user not found'})
    }
}catch(e){
     res.json({message:'user Not found'});
}
}
module.exports.deleteUser=async function deleteUser(req,res){
    //users={};
    try{
    let id=req.params.id;
    //console.log(id);
    let user=await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({message:'user not found'});
    }
    res.json({
        message:"data has been deleted",
        data:user
    });
}catch(err){
    res.json({message:err.message})
}
}
module.exports.getAllUser=async function getAllUser(req,res){
   let users=await userModel.find();
    if(users){
        res.json({
            message:'users retrived',
            data:users
        });
        return;
    }
    res.send("user id recieved");
}

module.exports.setCookies=function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('cookie has been set');
}

module.exports.getCookies=function getCookies(req,res){
    let cookies=req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies recievd');

}