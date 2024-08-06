import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();
//To verify that the person is still authorized
export default async (req,res,next)=>{
    const token = req.header("token");

    // Check if not token
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
  
    // Verify token
    try {
      //it is going to give use the user id (user:{id: user.id})
      const verify = jwt.verify(token, process.env.jwtSecret);
      // console.log(verify);
      
      req.user = verify.user;
      
      next();
    } catch (err) {
      res.status(403).json({ msg: "You are not authorized" });
    }
}