const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const playlistRouter = require("./playlistRoute");
// const orderRouter = require("./orderRoute");

router.use("/users", userRouter);
router.use("/playlists", playlistRouter);
// router.use("/orders", orderRouter);

module.exports = router;
