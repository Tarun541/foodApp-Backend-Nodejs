
const express=require('express');
const userRouter=express.Router();
//const protectRoute=require('./authHelper');

const {getUser,updateUser,getAllUser,deleteUser}=require('../controllers/userController');
//const app=express();

const {signup,login,isAuthorised,protectRoute,logout}=require('../controllers/authController');



    
userRouter.route('/login')
    .post(login)



userRouter.route('/signup')
    .post(signup)
    

userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)


    
    // admin specific function

// userRouter.route('/forgetpassword')
//     .post(forgetpassword)

// userRouter.route('/resetpassword')
//     .post(resetpassword)

userRouter
    .route('/setCookies')
   // .get(setCookies);

userRouter
    .route('/getCookies')
  //  .get(getCookies);


userRouter
    .route('/logout')
    .get(logout)

userRouter.use(protectRoute);
    userRouter
        .route('/userProfile')
        .get(getUser)
               
userRouter.use(isAuthorised(['admin']));
    userRouter
    .route('')
    .get(getAllUser)
    

module.exports=userRouter;