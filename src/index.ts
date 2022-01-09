import express from "express";
import morgan from "morgan";
import log from "@ajar/marker";
import cors from "cors";
import { connectDb } from "./db/mongoose.connection.js";
import userRouter from "./modules/user/user.router.js";
import {
    printError,
    errorResponse,
    urlNotFound,
} from "./middleware/errors.handler.js";

const { PORT = 8080, HOST = "localhost", DB_URI } = process.env;

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routing
app.use("/api/users", userRouter);

//when no routes were matched...
app.use("/", urlNotFound);

// central error handling
app.use(printError);
app.use(errorResponse);

//start the express api server
(async () => {
    //connect to mongo db
    await connectDb(DB_URI as string);
    await app.listen(Number(PORT), HOST as string);
    log.magenta("api is live on", ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);
})().catch(console.log);
