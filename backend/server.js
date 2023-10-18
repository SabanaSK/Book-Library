import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import booksRouter from "./routes/booksRouter.js";
import usersRouter from "./routes/usersRouter.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
