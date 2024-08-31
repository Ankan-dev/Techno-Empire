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
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String
    },
    refreshToken:{
        type:String
    }

})

module.exports=mongoose.model("Teachers",teacherSchema);