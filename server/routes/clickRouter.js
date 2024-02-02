import express from "express";
import UrlCollection from "../models/urlModel.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
    const URI = req.params.id;
    if (URI == "favicon.ico")
        return;
    const allData = await UrlCollection.findOne({ shortendURI: URI })
    if (!allData) {
        return res.status(404).json({ message: "no enpoint found" })
    }
    await UrlCollection.updateOne({ shortendURI: URI }, { $inc: { clicks: 1 } })
    res.status(200).json({ message: "redirecting...", url: allData.url });
});

export default router;