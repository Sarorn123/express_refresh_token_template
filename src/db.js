const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("DB Connected !");
});