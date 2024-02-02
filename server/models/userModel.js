import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        URLs: [{
            url: String,
            shortendURI: String,
            clicks: Number,
        }],
    }
);

const User = mongoose.model("User", userSchema);
export default User;