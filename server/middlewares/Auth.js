const jwt= require('jsonwebtoken')



const Auth=(req,res,next)=>{
    try {
         const token=req.header("authorization")
         console.log(token,"this is token")
         if(!token){
         return res.status(400).json({msg:"Invalid Authentication"})
               
         }
         
         jwt.verify(token,process.env.Refresh_token_secret,(err,user)=>{
            console.log(err)
            if(err){
            
            return res.status(400).json({msg:"Invalid Authentication"})
            }else{
               req.user=user
               next()
            }

            
         })
    } catch (error) {
      console.log(error)
       return res.status(500).json({msg:error.message+"auth error anei"}) 
    }
}

module.exports=Auth