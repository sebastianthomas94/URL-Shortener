import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
    [
        {
            url: String,
            shortendURI: String,
            clicks: {
                type: Number,
                default: 0
            },
            email: String,
        }
    ]);

const UrlCollection = mongoose.model("Urls", urlSchema);
export default UrlCollection;