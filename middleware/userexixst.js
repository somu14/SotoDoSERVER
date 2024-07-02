const User = require("../models/user");

const userExist = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({email:email});

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        next();
    } catch (err) {
        console.error("Error checking user existence:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};






module.exports =userExist;
