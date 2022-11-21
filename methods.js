const express=require('express');
const app=express();

app.listen(3000);
let users=[
    {
        id:1,
        name:"abhishek",
    },
    {
        id:2,
        name:"tarun",
    },
    {
        id:3,
        name:"rahul",
    }
];
//middleware func -> post, frontend->json
app.use(express.json());

const userRouter=express.Router();
app.use("/user",userRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserById);
// app.get("/users",);

// app.post('/users',);

// //update

// app.patch('/users',);

// //delete
// app.delete('/users',);


function getUser(req,res){
    res.send(users);
};

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received succesfully",
        user:req.body
    });
}

function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated succesfully"
    })
}

function deleteUser(req,res){
    users={};
    res.json({
        message:"data has been deleted"
    });
}

function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i].id==paramId){
            obj=users[i];}
    }
    res.json({
        message:"req received",
        data:obj
    });
}