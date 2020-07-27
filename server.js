const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv")


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(res => {
    console.log("connected to mongoose instance");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", routes);
    const port = process.env.PORT || 3000;
    app.listen(() => console.log("app is running at port: ", port))

  })
  .catch(er => console.log("failed to connect to mongoose instance"));
