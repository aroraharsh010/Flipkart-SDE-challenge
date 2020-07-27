const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
const port = process.env.PORT || 3000;
app.listen(port => console.log("app is running at port: ", port))
