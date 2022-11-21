
const mongoose=require('mongoose');
//
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const db_link='mongodb://127.0.0.1:27017/foodApp';
mongoose.connect(db_link)
    .then(()=>{
        //console.log(db);
        console.log('db connected');
    })
    .catch(function(err){
        console.log(err);
    });

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }},
        
    designation:{
        type:String,
        enum:['admin','user','restaurantOwner','deliveryboy'],
        default:'user',
        
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    }
    }
);


// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
//     this.confirmPassword=hashedString;
// })

userSchema.methods.createResetToken=function(){
        //creating unique token using npm i cryto
        const resetToken=crypto.randomBytes(32).toString("hex");
        this.resetToken=resetToken;
        return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}


const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;

// (async function createUser(){
//     let user={
//             name:"chandler",
//             email:"chandler@gmail.com",
//             password:"chandler123",
//             confirmPassword:"chandler123",
//             designation:"admin",
//             profileImage:"image/users/default.jpeg"        
        
//     }
//     let data=await userModel.create(user);
//     console.log(data);
// })();
