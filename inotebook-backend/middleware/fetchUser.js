var jwt = require('jsonwebtoken');
const JWT_Sceret = 'UETIANS';
const fetchUser=  (req,res,next)=>{
    const token=req.header('auth-token');
    if(! token){
        return res.status(401).json({error:"Token is not found ! Try again"})
    }    
    try {
        const data=jwt.verify(token,JWT_Sceret);
        req.user=data.user;
        next();   
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports=fetchUser;