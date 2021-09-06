//assistance functions

//converts seconds to the required minute fomat
function secondsToMinutesConvertor(songDuration){
  let durationInMinutes = songDuration / 60;
  let minutes = 0;
  let seconds = 0;
  let lengthFormat = 0;
  minutes = Math.floor(durationInMinutes);
  if(minutes === 0){
    minutes = "00"
  }else{
      if(minutes < 10){
        minutes = "0" + minutes.toString();
      }else{
        minutes = minutes.toString();
      }
}
  seconds = (Math.round((durationInMinutes - minutes) * 60));
  if(seconds === 0){
    seconds = "00"
  }else {
      if( seconds < 10){
        seconds = "0" + seconds.toString();
      }else{
        seconds = seconds.toString();
      }
}
  lengthFormat = minutes + ":" + seconds
  return lengthFormat
}
//recieves a song's id an returns that song's object
function getSongObjectById(id){
    let song = player.songs.filter(songObject => {
        if(songObject.id === id){
          return songObject;
        }
      })
      if(song.length == false){
        throw "undefined id";
      }
      song = song[0];
      return song;
}
// generat new ID function
function generatId(id, playlistsOrSongs, songsOrPlaylistsIdCounter){
  let newId = 0;
  let indexCounter = 0;
  if(!id){
      newId = songsOrPlaylistsIdCounter;
  }else{
      player[playlistsOrSongs].forEach(song => {
              if(song.id === id){
              throw "taken ID"
              }else{
                  indexCounter ++;
                  if(indexCounter === player[playlistsOrSongs].length){
                  newId = id;
                  }
          }
          });
  }
  songsOrPlaylistsIdCounter++;
  return newId
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
  playSong(id) {
    let song = getSongObjectById(id);
    song.duration = secondsToMinutesConvertor(song.duration);
    return("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + song.duration + ".")
  },
}

// playSong outside function
function playSong(id) {
 console.log(player.playSong(id))
}
playSong(5);

function removeSong(id) {
  let indexCounter = 0;
    player.songs.forEach(song => {
      if(song.id === id){
        player.songs.splice(indexCounter ,1);
      }else{
        indexCounter ++;
        if(indexCounter === player.songs.length){
          throw "Undefined ID"
        }
      }
    })
    player.playlists.forEach(playlist => {
      let playlistIndexCounter = 0;
      let songIndexCounter = 0;
      playlist.songs.forEach(song => {
        if (song === id){
           player.playlists[playlistIndexCounter].songs.splice(songIndexCounter, 1);
        }else{
          songIndexCounter ++;
        }
      })
    })
}

let idCounter = 8;
function addSong(title, album, artist, duration, id) {
  let newSongId = 0;
  let indexCounter = 0;
  if(id == undefined){
    newSongId = idCounter;
  }else{
      player.songs.forEach(song => {
            if(song.id === id){
              throw "taken ID"
            }else{
                indexCounter ++;
                if(indexCounter === player.songs.length){
                newSongId = id;
                }
          }
          });
  }
  idCounter ++;
  duration = secondsToMinutesConvertor(duration);
  let newSong = {
    "id" : newSongId,
    "title" : title,
    "album" : album,
    "artist" : artist,
    "duration" : duration
  }
  player.songs.push(newSong);
  return newSongId
}

function removePlaylist(id) {
  let indexCounter = 0;
  player.playlists.forEach(playlist => {
    if(playlist.id === id){
      player.playlists.splice(indexCounter ,1);
    }else{
      indexCounter ++;
    }
    if(indexCounter === player.playlists.length){
      throw "Undefined ID"
    }
  }) 
}
let playlistIdCounter = 6;
function createPlaylist(name, id) {
  let playListId = generatId(id, "playlists", playlistIdCounter);
    console.log(playListId);
  let newPlaylist = {
    "id" : playListId,
    "name" : name,
    "songs" : []
  }
  console.log(newPlaylist);
  player.playlists.push(newPlaylist);
}
createPlaylist("mosh");

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
