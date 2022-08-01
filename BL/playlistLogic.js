const { models } = require("mongoose");
const userController = require("../DL/controllers/userController");
const playlistController = require("../DL/controllers/playlistController");
const axios = require("axios")

const playlist = async (id) => {
    const playlist = await playlistController.readOne({ _id: id });
    return playlist
}

const getPlaylist = async (id) => {

    const playlist = await playlistController.readOne({ _id: id });
    const songs = await Promise.all(playlist.songs.map(async (song) => {
        const res = await axios.get(`https://simple-youtube-search.p.rapidapi.com/video?search=https://youtu.be/${song}`, {
            headers: {
                "X-RapidAPI-Key": "ca14220a3cmsh07cc4af9be28ef9p1f0706jsn77a3f8201075",
                "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
            },
        })
        // try {
        //     console.log(res.data.result.title);
        //     console.log(res.data.result.thumbnail.url);

        // }
        // catch (error) {
        //     console.log("blabla", song);
        // }

        return (

            {
                id: song,
                img: res.data.result.thumbnail.url,
                title: res.data.result.title
            }
        )
    }))

    return songs
};

const firstPlaylist = async (userId) => {
    const playlist = await playlistController.read({ userId, isActive: true });
    return { playlist: playlist[0]._id, song: playlist[0].songs[0] }
}
const songList = async (playlist) => {
    const songs = await playlistController.read({ _id: playlist })
    return songs

    //     const arrayToWork = [1, 2, 3];
    // const results = await Promise.all(
    //   arrayToWork.map(async (num) => {
    //     return num;
    //   }),
    // );
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

const delplaylist = async (playlistId) => {
    const playlist = await playlistController.deletePlaylist({ _id: playlistId })
    if (playlist.length === 0) throw ({ code: 400, message: "no playlist in this id" })

    return playlist
}

const delSong = async (idPlaylist, idSong) => {
    const playlist = await playlistController.readOne({ _id: idPlaylist });
    const index = playlist.songs.indexOf(idSong);
    playlist.songs.splice(index, 1)
    return await playlistController.update({ _id: idPlaylist }, { songs: playlist.songs })


}
module.exports = { getPlaylist, addPlaylist, addSong, firstPlaylist, songList, delplaylist, playlist, delSong };
