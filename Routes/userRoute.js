const express = require("express");
const router = express.Router();
const userLogic = require("../BL/userLogic");
const auth = require("../middleware/auth")

router.get("/checkToken", auth, async (req, res) => {
  try {
    res.send(await userLogic.getUser(req.user));
  } catch (error) {
    res.status(error.code || 400).send({ message: error.message });
  }
});
router.get("/", (req, res) => {
  res.send("users");
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const login = await userLogic.login(req.body.email, req.body.password)
    res.send(login)

  } catch (error) {
    console.log(error.message);
    res.status(error.code || 500).send({ message: error.message || "something wrong :( ..." })
  }
})


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = { name, email, password }
    const user = await userLogic.register(newUser);
    res.send(user);


  } catch (error) {
    console.log(error.message);
    res.status(error.code || 500).send({ message: error.message || "something wrong :( ..." })
  }
})

// router.post("/addUser", async (req, res) => {
//   const { name, email, password } = req.body;
//   const newUser = { name, email, password }
//   const user = await userLogic.addUser(newUser);
//   res.send(user);
// });

router.get("/allUsers", async (req, res) => {
  try {
    const users = await userLogic.getAllUsers();
    res.send(users);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "something wrong :( ..." })
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    res.send(await userLogic.playlistByUser(userId));
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "something wrong :( ..." })
  }
})

module.exports = router;
