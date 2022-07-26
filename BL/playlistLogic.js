const { models } = require("mongoose");
const userController = require("../DL/controllers/userController");
const playlistController = require("../DL/controllers/playlistController");
const axios = require("axios")

const getPlaylist = async (id) => {

    const playlist = await playlistController.readOne({ _id: id });
    const songs = playlist.songs.map(async (song) => {
        const res = await axios.get(`https://simple-youtube-search.p.rapidapi.com/video?search=https://youtu.be/${song}`, {
            headers: {
                "X-RapidAPI-Key": "ca14220a3cmsh07cc4af9be28ef9p1f0706jsn77a3f8201075",
                "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
            },
        })
        console.log(res.data.result.title);
        console.log(res.data.result.thumbnail.url);
        return (
            "hallo"
            // {
            //     id: song,
            //     img: res.data.result.thumbnail.url,
            //     title: res.data.result.title
            // }
        )
    })
    console.log("hii");
    console.log(songs);
    return songs
};

const firstPlaylist = async (userId) => {
    const playlist = await playlistController.read({ userId });
    return { playlist: playlist[0]._id, song: playlist[0].songs[0] }
}

const addPlaylist = async (playlist) => {
    console.log(playlist);
    if (!playlist.name) {
        throw ({ code: 400, message: "Error - name" })
    }
    if (!playlist.userId) {
        throw ({ code: 400, message: "Error - user" })
    }
    if (!playlist.songs) {
        throw ({ code: 400, message: "Error - song" })
    }
    const user = await userController.readOne({ _id: playlist.userId });
    if (!user) { throw ({ code: 400, message: "Error - user not found" }) };

    return await playlistController.create(playlist)
};

const addSong = async ({ songId, playlistId }) => {
    if (!songId) {
        ({ code: 400, message: "Error -song not found" })
    }
    if (!playlistId) {
        ({ code: 400, message: "Error -playlist not found" })

    }
    const playlist = await playlistController.readOne({ _id: playlistId });
    if (!playlist) {
        ({ code: 400, message: "Error -playlist not found" })
    }
    for (i of playlist.songs) {
        if (i === songId) {
            throw ({ code: 400, message: "song exist in playlist" })

        }
    }
    return await playlistController.update({ _id: playlistId }, { songs: [...playlist.songs, songId] })

}

module.exports = { getPlaylist, addPlaylist, addSong, firstPlaylist };
