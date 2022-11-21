const express=require('express');
const imageRouter=express.Router();
const path=require('path')

const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../views',)
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalnaame));

    }
})

const upload=multer({storage:storage});


imageRouter.route('/upload')
    .get(test)

upload.single("image");
imageRouter.route('/upload')
    .post(test);


function test(req,res){
    res.json({message:"test"});
}
module.exports=imageRouter;