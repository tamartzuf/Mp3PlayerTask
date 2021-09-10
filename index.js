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
      "Playing " + song.title 
      +" from " + song.album 
      + " by " + song.artist 
      + " | " 
      + durationFormat(song.duration) 
      +".")
  },
}

// creating a function that returns a song duration in the required format
function durationFormat(duration){
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if(minutes < 10 && seconds < 10)
    return "0"+minutes+":"+"0"+seconds;

    else if (minutes < 10) return "0"+minutes+":"+seconds;
         else if (seconds < 10) return minutes+":0"+seconds;
              else return minutes+":"+seconds;


}


function playSong(id) {

  if (!(checkId(player.songs,id))) throw "ERROR: id doesn't exict.";
  else for(let i = 0 ; i < player.songs.length ; i ++){
    if (player.songs[i].id === id)
      return player.playSong(player.songs[i]);
  }
  
}

// adding a function that checks if there is an id matching
function checkId(songs,id){
  for (let i = 0 ; i < songs.length ; i ++){
    if (id === songs[i].id)
      return true;
  }
  return false;
}


function removeSong(id) {
  if (!checkId(player.songs, id)){
    throw "ID doesn't exist."
  }
 
  
  for (let i = 0 ; i < player.songs.length ; i ++){
      if(player.songs[i].id === id ){
        player.songs.splice(i,1);
      }
  }

  for (let j = 0 ; j < player.playlists.length ; j ++){
for (let x = 0; x < player.playlists[j].songs.length; x++) {
    if(player.playlists[j].songs[x] === id){
      player.playlists[j].songs.splice(x,1);
    }
  
  
}

  }
  
}


// adding a function that returns a new id
function newId(arr){
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i].id)
    max = arr[i].id;   
  }
    return max+1;
}

// adding a function that takes the duration in a mm:ss format and turns it to seconds
function oppDuration(duration){
  duration = duration.split(':')
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
}

function addSong(title, album, artist, duration, id = newId(player.songs)) {
 if (checkId(player.songs, id)){
   throw "ID already Exist."
 }

 duration= oppDuration(duration);

 player.songs.push({title,album,artist,duration,id});
 return id;
}


function removePlaylist(id) {
  if (!checkId(player.playlists, id)){
    throw "ID doesn't exist."
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id)
        player.playlists.splice(i,1);
       
  }
}


function createPlaylist(name, id = newId(player.playlists)) {
  if (checkId(player.playlists, id)){
    throw "ID already exist."}

    player.playlists.push({name, id, songs: []});
    return id;

  
}


function playPlaylist(id) {
  if (!checkId(player.playlists, id)){
    throw "ID doesn't exist."}

    for (let i = 0; i < player.playlists.length; i++) {
      if(id === player.playlists[i].id){
          for (let x = 0; x < player.playlists[i].songs.length; x++) {
              playSong(player.playlists[i].songs[x]);
          }
      }
    }
    return id;
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


// do not change below this line

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
