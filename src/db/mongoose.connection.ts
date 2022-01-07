import mongoose from "mongoose";
import log from "@ajar/marker";

export const connect_db = async (uri: string) => {
    await mongoose.connect(uri);
    log.magenta(" ✨  Connected to Mongo DB ✨ ");
};
