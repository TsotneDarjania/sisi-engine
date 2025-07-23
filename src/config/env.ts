import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  JWTSecret: process.env.JST_SECRET,
};
