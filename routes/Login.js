const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  const values = req.body;
  try {
    const userdata = await user.findOne({ email: values.email });
    if (userdata == null) {
      return res.status(200).json({ message: "Not registered" });
    }
    const result = await bcrypt.compare(values.password, userdata.password);
    if (result) {
      const token = await jwt.sign(
        { email: values.email },
        process.env.secretkey,
        { expiresIn: "10d" }
      );
      //res.cookie("token", token);
      return res.status(200).json({ message: "login success",token:token});
    } else {
      return res.status(201).json({ message: "incorrect password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

module.exports = router;
