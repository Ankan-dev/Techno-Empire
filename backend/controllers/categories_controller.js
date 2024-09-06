const category=require('../models/categories-model.js')

const createCategory=async(req,res)=>{
    const user=req.user;

    if(!user){
        res.status(400)
        .json({
            message:"user not found",
            success:false
        })
    }

    const name=user.fullname;
    try{
        let checkCategory=await category.findOne({name});
        if(checkCategory){
            res.json({message:"category already exists",success:true});
        }else{
            let createCategory=await category.create({name});
            if(!createCategory){
                res.status(500)
                .json({
                    message:"creation failed",
                    success:false
                })
            }
            res.status(200)
            .json({message:"category is created",success:true});
        }
    }catch(error){
        res.status(500)
        .json({message:error.message,success:false});
    }
}

let getCategories= async (req,res)=>{
    try{
        let getAllCategories= await category.find();
        if(getAllCategories){
            res.json({allCategories:getAllCategories,success:true});
        }else{
            res.json({message:"categories not present",success:false})
        }
    }catch(error){
        res.json({message:error.message,success:false})
    }
}

module.exports={createCategory,getCategories};