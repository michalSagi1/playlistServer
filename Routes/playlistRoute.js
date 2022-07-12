const express = require("express");
const router = express.Router();
const playlistLogic = require("../BL/playlistLogic");

router.get("/", (req, res) => {
    res.send("playlist");
});

router.get("/firstPlaylist/:idUser", async (req, res) => {
    try {
        const data = await playlistLogic.firstPlaylist(req.params.idUser)
        res.send(data)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message || "something wrong :( ..." })
    }
})
router.get("/:idPlaylist", async (req, res) => {
    try {
        // console.log(req.params.idPlaylist);
        const Playlist = await playlistLogic.getPlaylist(req.params.idPlaylist)
        // console.log(Playlist);
        res.send(Playlist)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message || "something wrong :( ..." })
    }
});

router.post("/addPlaylist", async (req, res) => {
    try {
        console.log("router");
        const { name, userId, songs } = req.body;
        const playlist = { name, userId, songs }
        res.send(await playlistLogic.addPlaylist(playlist));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message || "something wrong :( ..." })
    }
});

router.put("/addSong", async (req, res) => {
    try {
        const { songId, playlistId } = req.body;
        const addSong = { songId, playlistId }
        res.send(await playlistLogic.addSong(addSong));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message || "something wrong :( ..." })
    }
})

module.exports = router;
