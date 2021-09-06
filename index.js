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

function toSeconds(duration) {
  let arr = duration.split(':');
  return parseInt(arr[0]) * 60 + parseInt(arr[1]);
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

function getPlaylist(id) {
  for(let playlist of player.playlists) {
    if(playlist.id === id) return playlist;
  }
}

function getSong(id) {
  for(let song of player.songs) {
    if(song.id === id) return song;
  }
}

function existError() {
  throw 'this id already exist!';
}
function notExistError() {
  throw 'this id does not exist!';
}

/*
recursion function that sums the array elements.
*/
function sumArr(arr) {
  if(arr.length === 0) return 0;
  return arr.pop() + sumArr(arr.slice(0, arr.length));
}

/*
this function gets a query, an array of objects, 
and array of keys and returns an array of
objects if the query includes in the keys
*/
function queryArr(query, objArr, keyArr) {
  const queryArr = [];
  for(let obj of objArr) {
    for(let i = 0; i < keyArr.length; i++) {
      if(obj[keyArr[i]].includes(query)) {
        queryArr.push(obj);
        i = keyArr.length;
      }
    }
  }
  return queryArr;
}

/*
this function gets an array of objects and sort
it alphanumerically by the property of the objects
*/
function sortObjectsArray(arr, property) {
  const sortedKeys = [];
  for(let key of arr) {
    sortedKeys.push(key[property]);
  }
  sortedKeys.sort();
  const sortedObjects = [];
  for (let i = 0; i < sortedKeys.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if(sortedKeys[i] === arr[j][property]) sortedObjects.push(arr[j]);
    }
  }
  return sortedObjects;
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
// console.log(toSeconds("04:19"))
// console.log(sumArr([242, 213, 270]));
// console.log(playlistDuration(1));
// console.log(player.songs[4].album.includes("ll"));
// console.log(searchByQuery("ll"));

function playSong(id) {
  if(!isIdExist(player.songs, id)) notExistError();
  for(let song of player.songs) {
    if(song.id === id) console.log(player.playSong(song));
  }
}

function removeSong(id) {
  let isExist = removeSongFromPlayer(id);
  if(!isExist) notExistError();
  removeSongFromPlaylists(id);
}

function addSong(title, album, artist, duration, id) {
  if(id === undefined) {
    id = getMaxId(player.songs) + 1; //generates auto id (max id + 1)
  } else {
    if(isIdExist(player.songs, id)) existError();
  }
  duration = toSeconds(duration);
  player.songs.push({id, title, album, artist, duration});
  return id;
}

function removePlaylist(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  for (let i in player.playlists) {
    if(player.playlists[i].id === id) player.playlists.splice(i, 1);
  }
}

function createPlaylist(name, id) {
  if(id === undefined) {
    id = getMaxId(player.playlists) + 1; //generates auto id (max id + 1)
  } else {
    if(isIdExist(player.playlists, id)) existError();
  }
  player.playlists.push({id, name, songs: []});
  return id;
}

function playPlaylist(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  const playlist = getPlaylist(id);
  for (let i = 0; i < playlist.songs.length; i++) {
    playSong(playlist.songs[i]);
  }
}

function editPlaylist(playlistId, songId) {
  if(!isIdExist(player.playlists, playlistId)) notExistError();
  if(!isIdExist(player.songs, songId)) notExistError();
  const playlist = getPlaylist(playlistId);
  if(playlist.songs.indexOf(songId) >= 0) {
    console.log(playlist.songs.splice(playlist.songs.indexOf(songId), 1));
    if(playlist.songs.length === 0) removePlaylist(playlistId);
  } else {
    playlist.songs.push(songId);
  }
}

function playlistDuration(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  const playlist = getPlaylist(id);
  const secondsArr = [];
  for (let songId of playlist.songs) {
    secondsArr.push(getSong(songId).duration);
  }
  return sumArr(secondsArr);
}

function searchByQuery(query) {
  const obj = {songs: [], playlists: []};
  obj.songs = queryArr(query, player.songs, ['title', 'album', 'artist']);
  obj.playlists = queryArr(query, player.playlists, ['name']);
  obj.songs = sortObjectsArray(obj.songs, 'title');
  obj.playlists = sortObjectsArray(obj.playlists, 'name');
  return obj;
}

function searchByDuration(duration) {
  duration = toSeconds(duration);
  let difference;
  let obj = null;
  for(let playlist of player.playlists) {
    let diff = playlistDuration(playlist.id) - duration;
    if(Math.abs(diff) < difference || !difference) {
      difference = Math.abs(diff);
      obj = playlist;
    }
  }
  for(let song of player.songs) {
    let diff = song.duration - duration;
    if(Math.abs(diff) < difference) {
      difference = Math.abs(diff);
      obj = song;
    }
  }
  return obj;
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
