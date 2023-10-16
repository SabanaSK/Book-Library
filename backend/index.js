import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import booksRouter from "./routes/booksRouter.js";

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
app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
