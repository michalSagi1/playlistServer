//enter url mongo in db
const express = require("express");
const app = express();
const PORT = 3030;

app.use(express.json());
app.use(require("cors")());

app.use("/api", require("./Routes"));

app.listen(PORT, () => console.log(`server is running=>${PORT}`));
require("./DL/db").connect();
