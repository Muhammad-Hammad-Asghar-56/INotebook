var jwt = require('jsonwebtoken');
const JWT_Sceret = 'UETIANS';
const fetchUser=  (req,res,next)=>{
    const token=req.header('auth-token');
    if(! token){
        return res.status(400).json({error:"Token Access Deined ! Try again"})
    }
    const data=jwt.verify(token,JWT_Sceret);
    req.user=data.user;
    next();
}
module.exports=fetchUser;