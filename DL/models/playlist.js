const mongoose = require("mongoose");
require("./user")

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    playlistDate: {
        type: Date, default: Date.now
    },
    // songs: [{ type: String }],

    songs: [{ songId: { type: String }, songTitle: { type: String }, img: { type: String } }],


    isActive: {
        type: Boolean,
        default: true,
    },
});

const playlistModel = mongoose.model("playlist", playlistSchema);
//op 1:
module.exports = { playlistModel };