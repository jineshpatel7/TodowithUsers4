import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h"}) //or 60*60 etc.
}
export default jwtGenerator;