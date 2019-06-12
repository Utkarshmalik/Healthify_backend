const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Healthify", {
    useNewUrlParser: true,
    useCreateIndex: true
});
