import express from "express";
import { ENV } from "./config/env";
import apiRouter from "./routes/apiRoutes";
import { connectDB } from "./config/mongoDB";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend origin
    credentials: true, // allow credentials (cookies)
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", apiRouter);

(async () => {
  await connectDB();
  app.listen(ENV.PORT || 8080, () => {
    console.log(`Server Listen on port ${ENV.PORT || 8080}`);
  });
})();
