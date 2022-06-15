const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
// const itemRouter = require("./itemRoute");
// const orderRouter = require("./orderRoute");

router.use("/users", userRouter);
// router.use("/items", itemRouter);
// router.use("/orders", orderRouter);

module.exports = router;
