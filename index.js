/*
this function gets one parameter seconds
and return a string value of the minutes
in 'mm:ss' format.
*/
function toMinutes(sec) {
  let minFormat = ["mm", "ss"];
  minFormat[1] = sec % 60 < 10 ? "0" + sec % 60: sec % 60;
  minFormat[0] = sec / 60 < 10 ? "0" + Math.floor(sec / 60): Math.floor(sec / 60);
  return minFormat.join(':');
}

function removeSongFromPlayer(id) {
  for(let i in player.songs) {
    if(player.songs[i].id === id) {
      player.songs.splice(i,1);
      return true;
    }
  }
  return false;
}

function removeSongFromPlaylists(id) {
  for(let playlist of player.playlists) {
    for (let i in playlist.songs) {
      if(playlist.songs[i] === id) playlist.songs.splice(i, 1);
    }
  }
}

/*
this function checks if an id exists in the objects array
*/
function isIdExist(arr, id) {
  for (let obj of arr) {
    if(obj.id === id) return true;
  }
  return false;
}

/*
this function return the max id of an objects array
*/
function getMaxId(arr) {
  let max = 0;
  for (let obj of arr) {
    if(obj.id > max) max = obj.id;
  }
  return max;
}

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
    return `Playing ${song.title} from ${song.album} by ${song.artist} | ${toMinutes(song.duration)}.`;
  },
}

/* CHECKING deleteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee lineeeeeeeeeeeeeeee*/
// // let arr = [1,2,3,4];
// // arr.splice(2,1);
// // console.log(arr);
console.log(isIdExist(player.songs, 6))

function playSong(id) {
  let isExist = false;
  for(let song of player.songs) {
    if(song.id === id) {
      console.log(player.playSong(song));
      isExist = true;
    }
  }
  if(!isExist) throw 'song does not exist!';
}

function removeSong(id) {
  let isExist = removeSongFromPlayer(id);
  if(!isExist) throw 'song does not exist!';
  removeSongFromPlaylists(id);
}

function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
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
