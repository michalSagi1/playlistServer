const userController = require("../DL/controllers/userController");
const playlistController = require("../DL/controllers/playlistController");

const playlist = async (id) => {
    const playlist = await playlistController.readOne({ _id: id });
    return playlist;
};

const getPlaylist = async (id) => {
    const playlist = await playlistController.readOne({ _id: id });
    const songs = await playlist.songs.map((song) => {
        return {
            id: song.songId,
            title: song.songTitle,
            img: song.img,
        };
    });
    return songs;
};

const songList = async (playlist) => {
    const songs = await playlistController.read({ _id: playlist });
    return songs;
};

const addPlaylist = async (playlist) => {
    console.log(playlist);
    if (!playlist.name) {
        throw { code: 400, message: "Enter a name for the playlist" };
    }
    if (!playlist.userId) {
        throw { code: 400, message: "Error - user" };
    }

    const user = await userController.readOne({ _id: playlist.userId });
    if (!user) {
        throw { code: 400, message: "Error - user not found" };
    }

    if (playlist.songs) {
        const newPlaylist = {
            name: playlist.name,
            userId: playlist.userId,
            songs: [
                {
                    songId: playlist.songs,
                    songTitle: playlist.songTitle,
                    img: playlist.img,
                },
            ],
        };
        return await playlistController.create(newPlaylist);
    } else {
        return await playlistController.create(playlist);
    }
};

const addSong = async ({ songId, playlistId, songTitle, img }) => {
    if (!songId) {
        throw ({ code: 400, message: "Error -song not found" });
    }
    if (!playlistId) {
        throw ({ code: 400, message: "playlist not found" });
    }
    const playlist = await playlistController.readOne({ _id: playlistId });
    if (!playlist) {
        throw ({ code: 400, message: "Error -playlist not found" });
    }
    for (i of playlist.songs) {
        if (i.songId === songId) {
            throw { code: 400, message: "song exist in playlist" };
        }
    }
    return await playlistController.update(
        { _id: playlistId },
        { songs: [...playlist.songs, { songId, songTitle, img }] }
    );
};
const allPlaylists = async (userId) => {
    const user = await userController.readOne({ _id: userId });
    if (!user) throw { code: 400, message: "Error - user not found" };
    const playlists = await playlistController.read(
        { userId, isActive: true },
        "songs name"
    );
    return playlists;
};

const delPlaylist = async (playlistId) => {
    const playlist = await playlistController.deletePlaylist({ _id: playlistId });
    if (playlist.length === 0)
        throw { code: 400, message: "no playlist in this id" };

    return playlist;
};

const delSong = async (idPlaylist, idSong) => {
    const playlist = await playlistController.readOne({ _id: idPlaylist });
    const index = playlist.songs.indexOf(idSong);
    playlist.songs.splice(index, 1);
    return await playlistController.update(
        { _id: idPlaylist },
        { songs: playlist.songs }
    );
};

const renamePlaylist = async (idPlaylist, newName) => {
    const playlist = await playlistController.readOne({ _id: idPlaylist });
    return await playlistController.update(
        { _id: idPlaylist },
        { name: newName }
    );
};
module.exports = {
    allPlaylists,
    getPlaylist,
    addPlaylist,
    addSong,
    songList,
    delPlaylist,
    playlist,
    delSong,
    renamePlaylist,
};
