const express = require("express");
const router = express.Router();
const playlistLogic = require("../BL/playlistLogic");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
    res.send("playlist");
});
router.get("/allPlaylists/:userId", auth, async (req, res) => {
    try {
        const data = await playlistLogic.allPlaylists(req.params.userId);
        res.send(data);
    } catch (error) {
        console.log("Error:", error.message);

        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.get("/firstPlaylist/:idUser", auth, async (req, res) => {
    try {
        const data = await playlistLogic.firstPlaylist(req.params.idUser);
        res.send(data);
    } catch (error) {
        console.log("Error:", error.message);

        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.get("/:idPlaylist", auth, async (req, res) => {
    try {
        const Playlist = await playlistLogic.playlist(req.params.idPlaylist);
        res.send(Playlist);
    } catch (error) {
        console.log("Error:", error.message);

        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.post("/addPlaylist", auth, async (req, res) => {
    try {
        console.log("addPlaylist");

        res.send(await playlistLogic.addPlaylist(req.body));
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.put("/addSong", auth, async (req, res) => {
    try {
        const { songId, playlistId, songTitle, img } = req.body;
        const addSong = { songId, playlistId, songTitle, img };
        res.send(await playlistLogic.addSong(addSong));
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.get("/songsList/:idPlaylist", auth, async (req, res) => {
    try {
        res.send(await playlistLogic.getPlaylist(req.params.idPlaylist));
    } catch (error) {
        console.log("error");
        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });

        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.get("/songsList/:idPlaylist", auth, async (req, res) => {
    try {
        res.send(await playlistLogic.getPlaylist(req.params.idPlaylist));
    } catch (error) {
        console.log("Error:", error.message);
        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.put("/deletePlaylist/:idPlaylist", auth, async (req, res) => {
    try {
        res.send(await playlistLogic.delPlaylist(req.params.idPlaylist));
    } catch (error) {
        res.status(error.code || 400).send({ message: error.message });
    }
});
router.post("/delSong", auth, async (req, res) => {
    try {
        console.log("router");
        const { idPlaylist, idSong } = req.body;
        res.send(await playlistLogic.delSong(idPlaylist, idSong));
    } catch (error) {
        console.log("Error:", error.message);

        res
            .status(500)
            .send({ message: error.message || "something wrong :( ..." });
    }
});
router.post("/renamePlaylist", auth, async (req, res) => {
    try {
        const { idPlaylist, newName } = req.body;
        res.send(await playlistLogic.renamePlaylist(idPlaylist, newName));
    } catch (error) {
        res.status(error.code || 400).send({ message: error.message });
    }
});

module.exports = router;
