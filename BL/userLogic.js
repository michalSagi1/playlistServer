const { models } = require("mongoose");
const userController = require("../DL/controllers/userController");
const playlistController = require("../DL/controllers/playlistController");
const { createToken } = require("./jwt")
const bcrypt = require('bcrypt')

const login = async (email, password) => {
  console.log(email + " " + password);

  if (!email || !password) throw ({ code: 400, message: "missing data" })
  const user = await userController.readOne({ email }, "+hashedPassword +salt");

  if (!user) {
    throw ({ code: 403, message: "Error - user" })
  }
  console.log(user.salt);
  const hashedPassword = await bcrypt.hash(password, user.salt)
  console.log("yes");

  console.log(user, hashedPassword);
  console.log("bla bla" + user.hashedPassword);
  if (hashedPassword !== user.hashedPassword) throw ({ code: 503, message: "not auth" })
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
  const salt = await bcrypt.genSalt()
  console.log("salt:" + salt);
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.salt = salt
  user.hashedPassword = hashedPassword
  delete user.password
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

  return await playlistController.read({ userId, isActive: true }, "songs name",);
}
const getUser = async (user) => {
  return { id: user._id, email: user.email };
};
module.exports = { login, getAllUsers, register, playlistByUser, getUser };
