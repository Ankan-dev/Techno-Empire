const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        default:undefined
    },
    college:{
        type:String,
        default:undefined
    },
    cgpa:{
        type:String,
        default:undefined
    },
    verified:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    }
})

const Student=mongoose.model('Student',studentSchema);
module.exports=Student;