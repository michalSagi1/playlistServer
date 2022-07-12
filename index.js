require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;


app.use(express.json());
app.use(require("cors")());

app.use("/api", require("./Routes"));

app.listen(port, () => console.log(`server is running=>${port}`));
require("./DL/db").connect();
