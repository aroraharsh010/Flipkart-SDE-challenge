
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routes = require('./router')

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(res => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", routes);
    app.get("/test", (req, res) => res.status(200).send({ message: "pong" }));
    const port = process.env.PORT || 8080
;
//	console.log({port});
    app.listen( () => console.log("app is running at port:", port));
//        console.log({port});

  })
  .catch(er => console.log("failed to connect to mongoose instance"));
