const OneTimePassword=()=>{
    let otp=Math.floor(Math.random()*9999);
    return otp;
}

module.exports={OneTimePassword};