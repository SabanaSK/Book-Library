import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import usersRoutes from "./routes/users.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

const logger = (req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body);
  next();
};

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
