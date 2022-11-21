const express=require('express');
const reviewRouter=express.Router();

const {protectRoute} = require('../controllers/authController');
const {getAllReviews,top3Reviews,getPlanReviews,createReview,updateReview,deleteReview}=require('../controllers/reviewController');

reviewRouter
    .route('/all')
    .get(getAllReviews)

reviewRouter
    .route('/top3')
    .get(top3Reviews)

reviewRouter
    .route('/:id')
    .get(getPlanReviews)

reviewRouter.use(protectRoute);
reviewRouter
    .route('/crud/:plan')
    .post(createReview)

reviewRouter   
    .route('/crud/:id')
    .patch(updateReview)
    .delete(deleteReview)

module.exports=reviewRouter;

    
