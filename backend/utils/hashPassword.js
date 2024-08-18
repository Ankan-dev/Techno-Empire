const bcrypt=require('bcrypt');
const Student=require('../models/student-model.js')

const hashingPassword=(password)=>{
    const salt=10;
    const hashedPassword=bcrypt.hash(password,salt);
    if(hashedPassword){
        return hashedPassword;
    }else{
        return false;
    }
}

const verifyPassword= async(email,password)=>{
    const savedUser= await Student.findOne({email:email});
    if(!savedUser){
        return false
    }
    const savedPassword=savedUser.password;
    delete savedUser.password;
    delete savedPassword.refreshToken;

    const validPassword=bcrypt.compare(password,savedPassword);
    if(!validPassword){
        return false
    }
    return savedUser;
}

module.exports={hashingPassword,verifyPassword};