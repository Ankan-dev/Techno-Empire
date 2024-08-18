const mongoose=require('mongoose');

const tokenSchema=mongoose.Schema({
    email:{
        type:String
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    token:{
        type:String
    }
})

const Token=mongoose.model('Token',tokenSchema);
module.exports=Token;