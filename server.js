const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./router")
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("database connected"))
  .catch((er) => console.log("failed to connect to mongoose instance"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.get("/test", (req, res) => res.status(200).send({ message: "pong" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
