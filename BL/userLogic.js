const { models } = require("mongoose");
const userController = require("../DL/controllers/userController");

const login = async (user) => {};

const addUser = async (user) => {
  return await userController.create(user);
};

const getAllUsers = async () => {
  return await userController.read({});
};
module.exports = { getAllUsers, addUser, login };
