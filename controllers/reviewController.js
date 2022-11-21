const reviewModel = require("../models/reviewModel");
const planModel=require("../models/planModel");
// const {updatePlan}=require('./planController');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message:'reviews retrived',
                data:reviews})
        }
        else{
            return res.json({message:'review not found'})
        }
    }
    catch(err){
        res.json(err.message)
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({ratings:-1}).limit(3);
        if(reviews){
            return res.json({
                message:'reviews retrived',
                data:reviews})
        }
        else{
            return res.json({message:'review not found'})
        }
    }
    catch(err){
        res.json(err.message)
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        const id=req.params.id;
        const reviews=await reviewModel.findById(id);
        if(reviews){
            return res.json({message:'data retrived',data:reviews});
        }
        else{
            return res.json({message:'reviews not found'});

        }
    }
    catch(err){
        res.json(err.message)
    }
}

module.exports.createReview=async function createReview(req,res){
        try{
            let id=req.params.plan;
        let plan=await planModel.findById(id);
        let review=await reviewModel.create(req.body);
        plan.ratingsAverage=(plan.RatingsAverage+review.rating)/2;
        await plan.save();
        return res.json({message:'review created',data:review})
    }catch(err){
        res.json({message:err.message});
    }

}

module.exports.updateReview=async function updateReview(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let review=await reviewModel.findOneAndUpdate(id);
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await review.save();
        return res.json({
            message:'review updated succesfully',
            data:review
        })
    }catch(err){res.json({message:err.message})}
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let id=req.params.id;
        let review=await reviewModel.findOneAndDelete(id);
       // await review.save();
        return res.json({
            message:'review deleted succesfully',
            data:review
        })
    }catch(err){res.json({message:err.message})}
}