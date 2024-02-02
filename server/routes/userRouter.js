import express from "express";
import User from "../models/userModel.js";
import { authorization } from "../middleWears/auth.js";
import { randomGen } from "../helpers/main.js";
import UrlCollection from "../models/urlModel.js";

const router = express.Router();

router.use(authorization);

router.post('/create', async (req, res) => {
    try {
        const { email } = req.session;
        const { url } = req.body;
        const dupe = await UrlCollection.find({email, url})
        if (dupe.length)
            return res.status(200).json({ message: 'url already shortened', dupe });
        const randomURI = randomGen();
        const newEntry = { url, shortendURI: randomURI, email };
        const urlObj = new UrlCollection(newEntry);
        await urlObj.save(newEntry);
        res.status(200).json({ message: "created new url added" });

    } catch (error) {
        console.log("error at create url:", error);
        res.status(500).json({ message: "server error at create url" });
    }
});

router.get('/getData', async (req, res) => {
    try {
        const { email } = req.session;
        const allData = await UrlCollection.find({ email });
        res.status(200).json(allData);
    } catch (error) {
        res.status(500).json({message:"internel server error at get url data"});

    }
});

export default router;