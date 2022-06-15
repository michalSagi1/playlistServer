const express = require("express");
const router = express.Router();
const userLogic = require("../BL/userLogic");

router.get("/", (req, res) => {
  res.send("users");
});

router.get("/allUsers", async (req, res) => {
  const users = await userLogic.getAllUsers();
  res.send(users);
});

module.exports = router;
