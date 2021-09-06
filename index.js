const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(
      'Playing ' +
        song.title +
        ' from ' +
        song.album +
        ' by ' +
        song.artist +
        ' | ' +
        durationFormat(song.duration) +
        '.'
    )
  },
}

//presen according the mm:ss format
function durationFormat(duration) {
  let minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (minutes < 10 && seconds < 10) {
    return '0' + minutes + ':0' + seconds
  } else if (minutes < 10) {
    return '0' + minutes + ':' + seconds
  } else if (seconds < 10) {
    return minutes + ':0' + seconds
  }
  return minutes + ':' + seconds
}

//function to check if id is exist in song
function isIdExist(playerSong, id) {
  for (let i = 0; i < playerSong.length; i++) {
    if (playerSong[i].id === id) {
      return true
    }
  }
  return false
}

//return the max id from tae array songs
function maxId() {
  let max = player.songs[0].id
  for (let i = 0; i < player.songs.length; i++) {
    if (max < player.songs[i].id) {
      max = arr[i].id
    }
  }
  return max
}

//create new id
function newId() {
  return maxId() + 1
}
///////////////////////////////////////////////////////////////////////////

function playSong(id) {
  if (!isIdExist(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      player.playSong(player.songs[i])
    }
  }
}

function removeSong(id) {
  if (!isIdExist(player.songs, id)) {
    throw new error('ID is not exist')
  }

  for (let i = 0; i < player.songs.length; i++) {
    //remove id from songs
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
    }
  }
  for (let j = 0; j < player.playlists.length; j++) {
    //remove id from playlist
    for (let k = 0; k < player.playlists[j].songs.length; k++) {
      if (player.playlists[j].songs[k] === id) {
        player.playlists[j].songs.splice(k, 1)
      }
    }
  }
}

function addSong(title, album, artist, duration, id = newId()) {
  if (isIdExist(player.songs, id)) throw new Error('ID is already exist')
  duration = durationFormat(duration)
  player.songs.push({ title, album, artist, duration, id })
  return id
}

function removePlaylist(id) {
  if (!isIdExist(player.playlists, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) player.playlists.splice(i, 1)
  }
}

function createPlaylist(name, id = newId()) {
  if (isIdExist(player.playlists, id)) throw new Error('ID is already exist')
  player.playlists.push({ name, id })
  return id
}

function playPlaylist(id) {
  if (!isIdExist(player.playlists, id))
    throw new Error('ID already exist, change the ID or omit it')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        playSong(player.playlists[i].songs[j])
      }
    }
  }
  return id
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
