import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import booksRouter from "./routes/booksRouter.js";
import usersRouter from "./routes/usersRouter.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import corsOptions from "./middleware/cors.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use("/api/books", booksRouter);
app.use("/api/auth", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); //Delete the port console.log on final
});

export default app;
