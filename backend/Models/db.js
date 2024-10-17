const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
    .then(() => {
        console.log("MongoDB connected...");
    }).catch((err) => {
        console.log("MongoDB connection error: ", err);
    })