const { playlistModel } = require("../models/playlist");

async function create(data) {
    return await playlistModel.create(data);
}
async function read(filter, proj) {
    return await playlistModel.find(filter, proj);
}
async function readOne(filter, proj) {
    return await playlistModel.findOne(filter, proj);
}
async function update(filter, newData) {
    return await playlistModel.findOneAndUpdate(filter, newData, { new: true });
}
async function deleteOne(filter) {
    return await updateOne(filter, { isActive: false });
}

module.exports = { create, read, readOne, update, deleteOne };
