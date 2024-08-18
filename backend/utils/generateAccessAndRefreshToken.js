const jwt =require('jsonwebtoken');

const generateAccessToken=(id,email)=>{
    const token=jwt.sign({id:id,email:email},
        process.env.SECRET,
        {expiresIn:86400}
    )

    return token;
}
const generateRefreshToken=(id,email)=>{
    const token=jwt.sign({id:id,email:email},
        process.env.SECRET,
        {expiresIn:86400}
    )

    return token;
}

module.exports={generateAccessToken,generateRefreshToken}