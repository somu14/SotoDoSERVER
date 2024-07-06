const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected");
    } catch (error) {
        console.log("mongo error is:", error);
    }
};

module.exports = connectdb;
