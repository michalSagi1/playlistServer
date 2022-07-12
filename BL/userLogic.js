const { models } = require("mongoose");
const userController = require("../DL/controllers/userController");
const playlistController = require("../DL/controllers/playlistController");
const { createToken } = require("./jwt")

const login = async (email, password) => {
  console.log(email + " " + password);

  if (!email || !password) throw ({ code: 400, message: "missing data" })
  const user = await userController.readOne({ email, password });
  if (!user) {
    throw ({ code: 403, message: "Error - user" })
  }
  const userIn = { user, token: createToken(user._id) }
  console.log(userIn)
  return userIn

}

const register = async (user) => {
  if (!user.email) {
    throw ({ code: 400, message: "Error - email" })
  }
  if (!user.name) {
    throw ({ code: 400, message: "Error - name" })
  }
  if (!user.password) {
    throw ({ code: 400, message: "Error - password" })
  }
  const _user = await userController.readOne({ email: user.email });
  if (_user) {
    throw ({ code: 400, message: "Error - email exist in system" })
  }
  const newuser = await userController.create(user);
  return { user: newuser, token: createToken(user._id) };
};


const getAllUsers = async () => {
  const users = await userController.read({});
  if (users.length === 0) throw ({ code: 400, message: "there is no items" })
  return users
};


const playlistByUser = async (userId) => {
  const user = await userController.readOne({ _id: userId })
  if (!user) throw ({ code: 400, message: "Error - user not found" })

  return await playlistController.read({ userId }, "songs name",);
}
module.exports = { login, getAllUsers, register, playlistByUser };
