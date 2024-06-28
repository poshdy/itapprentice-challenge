import "dotenv/config";
import express from "express";
import { config } from "./config.js";
import {
  limiter,
  CORS,
  Helmet,
  Logger,
  mongoSanitize,
  XSS,
  errorHandler,
  cookie,
} from "./middleware/index.js";

import { authRouter } from "./routes/auth-route.js";
import { connectDb } from "./db/mongodb-connection.js";
import { userRouter } from "./routes/user-route.js";

const app = express();
const PORT = config.port;

app.use(Logger);
app.use(Helmet);
app.use(CORS);
app.use(limiter);
app.use(express.json());
app.use(cookie)
connectDb();

// data sanitization for mongo db to prevent no sql injection
app.use(mongoSanitize);
// data sanitization to prevent xss
app.use(XSS);

app.use(`${config.prefix}/auth`, authRouter);
app.use(`${config.prefix}/users`, userRouter);

app.use(errorHandler);
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
