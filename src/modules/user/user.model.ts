import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

const UserSchema = new Schema<User>({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
});

export default model<User>("user", UserSchema);
