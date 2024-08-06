import express from "express"

const router = express.Router();

import db from "../db.js"
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middlewares/validInfo.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/zodmiddleware.js";
import {signupSchema,loginSchema} from "../middlewares/zodvalidator.js"


router.post("/register", validate(signupSchema) ,async (req, res) => {

    //1. Destructure the req.body object
    const { email, name, password } = req.body;

    try {
      //2. check if user exists 
      const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]); 
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
      //3. Bcrypt the user password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);
      
      let newUser = await db.query(
        "INSERT INTO users (username, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );

      // console.log(newUser.rows[0]);
      
      
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      
      res.json({ jwtToken });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

router.post("/login",validate(loginSchema) , async(req,res)=>{
    const {email, password} = req.body;

    
    //1. Check if user exist
    const user = await db.query("select *from users where user_email = $1", [email]);

    

    if(user.rows.length == 0){
      res.status(401).json("Invalid Credentials")
    }

    //2. Check if password is correct
    // console.log(user.rows[0].user_password);
    else{
    await bcrypt.compare(password, user.rows[0].user_password, (err,result)=>{
      if(err){
        console.error(err)
      } else{
        if(!result){
        res.status(401).json("Incorrect Password")
        }else{
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        res.json({jwtToken})
        }
      }
    });
  }
  })
    // or 
    // const validpassword =   await bcrypt.compare(password, user.rows[0].user_password) // it returns true or false
    // console.log(validpassword);
    
//Check that the user is still the same user with token given to it    
router.get("/verify", authorize, async (req, res) => {  
      try {
        // console.log(req.header);
        
        res.json(true);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      } 
    });

    
   

   

export default router;