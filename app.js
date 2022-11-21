const express=require('express');
const app=express();



const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


app.listen(3000);

// app.post('/check', async (req,res)=>{
//     const {name,email,password,confirmPassword,role}=req.body;
//     const user=new User({name,email,password,confirmPassword,role});
//     await user.save();
//     res.status(200).json({message:"registered successfully"});
// })

const userRouter=require('./routers/userRouter');

const planRouter=require('./routers/planRouter');
// const reviewRouter=require('./routers/reviewRouter');
// const imageRouter=require('./routers/imageRouter'); 


app.use("/user",userRouter);
app.use("/plans",planRouter);
// app.use('/image',imageRouter);
// app.use("/review",reviewRouter);




