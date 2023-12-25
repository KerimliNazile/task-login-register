import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    password : { type: String, required: true },
    role : { type: String }
});

UserSchema.pre("save", async function (next) {
    const rounds = 12;
    const hashPassword = await bcrypt.hash(this.password, rounds);
    this.password = hashPassword;
    next();
});

export default mongoose.model("users", UserSchema);