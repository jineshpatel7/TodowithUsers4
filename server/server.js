import express from "express";
const app = express();
import cors from "cors";
import router from "./routes/jwtAuth.js";
import dash from "./routes/dashboard.js"
import todoDashboard from "./routes/todoDashboard.js";

app.use(express.json())
app.use(cors())

app.use("/auth", router);

app.use("/dashboard", dash);

app.use("/todos", todoDashboard);

const port = process.env.PORT || 5000 || 10000;

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});