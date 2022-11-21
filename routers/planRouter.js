const express=require('express');
const planRouter=express.Router();

const {protectRoute,isAuthorised}=require('../controllers/authController');
const {getPlan,getAllPlans,createPlan,deletePlan,updatePlan,top3plans}=require('../controllers/planController')
//all plans leke aao

planRouter 
    .route('/allPlans')
    .get(getAllPlans)
                  
//ownplan - login necessary
planRouter.use(protectRoute) 
planRouter
    .route('/plan/:id')
    .get(getPlan)

//admin and restaurant owner can only create and delete update plans
planRouter.use(isAuthorised(['admin','restaurantOwner']))
planRouter
    .route('/crudPlan/:plan')
    .post(createPlan)

planRouter
    .route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

planRouter 
    .route('/top3')
    .get(top3plans)
 module.exports=planRouter;