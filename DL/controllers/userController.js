const { userModel } = require("../models/user");

async function create(data) {
  return await userModel.create(data);
}
async function read(filter) {
  return await userModel.find(filter);
}
async function readOne(filter) {
  return await userModel.findOne(filter);
}
async function update(filter, newData) {
  return await userModel.updateOne(filter, newData);
}
async function deleteOne(filter) {
  //   const res = await userModel.deleteOne(data);
  return await update(filter, { isActive: false });
}

module.exports = { create, read, readOne, update, deleteOne };
