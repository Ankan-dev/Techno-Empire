const mongoose=require('mongoose');
const teacherSchema= mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        required:true
    },
    verificationCode:{
        type:String,
    },
    picture:{
        type:String
    },
    verified: {
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    }
})

module.exports=mongoose.model("Teachers",teacherSchema);