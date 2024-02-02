import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Define routes
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        const savedUser = await user.save();

        console.log("User has been saved:", savedUser);
        res.status(201).json({ message: "User has been saved", user: savedUser });
    } catch (error) {
        console.error("Error saving user:", error);

        const status = error.code;
        console.log("Error status code:", status);

        switch (status) {
            case 11000:
                console.log("User already exists");
                res.status(409).json({ message: "User already exists" });
                break;
            default:
                console.log("Validation error");
                res.status(400).json({ message: "Validation error" });
        }
    }
});


router.get('/about', (req, res) => {
    res.send('About Page');
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database by email
        const user = await User.findOne({ email });

        // If the user is not found, return an error
        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }



        // If the password is not valid, return an error
        if (user.password != password) {
            return res.status(401).json({ message: "Authentication failed. Invalid password." });
        }

        // Password is valid, user is authenticated
        req.session.auth = true;
        req.session.email = email;
        res.status(200).json({ message: "Authentication successful", user: user });

    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: "succesfully loged out" });
        }
    });
})

export default router;