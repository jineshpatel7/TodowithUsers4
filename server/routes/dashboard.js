import express from "express";
const router = express.Router();
import authorize from "../middlewares/authorize.js";
import db from "../db.js"

router.get("/", authorize, async (req, res) => {
    try {
      const user = await db.query(
        "SELECT username FROM users WHERE user_id = $1",
        [req.user] 
      ); 
      
    //it would be req.user if you change your payload to this:
      
    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };
      
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

export default router;