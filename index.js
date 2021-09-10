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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`) 
  },
}
function convertDuration(duration)
{
  let minutes=Math.floor(duration/60);
  let seconds=duration%60;
  if(minutes<10)
    minutes="0"+minutes;
  if(seconds<10)
    seconds="0"+seconds;
  return minutes+":"+seconds;
}
function playSong(id) 
{
 
    var wantedSong = player.songs.find(res => res.id == id);
    if(wantedSong===null){
      throw new Error("ID not found");
    }
    player.playSong(wantedSong);

}


function removeSong(id) {
  var wantedSong = player.songs.find(res => res.id == id);

  let index = player.songs.indexOf(wantedSong);
  if(index ===-1){
    throw new Error("ID not found");
  }
  player.songs.splice(index,1);
  player.playlists.forEach(element => {
    let indexpl = element.songs.indexOf(id);
    element.songs.splice(indexpl, 1);
  });
}


function addSong(title, album, artist, duration, id) {

if (arguments.length < 5 || id === undefined){
  var id = 1;
  player.songs.forEach(element => {
    id += element.id;
  });
}

player.songs.forEach(element => {
  if(element.id === id){
    throw new Error("the ID is taken");
  }
});

durationArr=duration.split(":");
duration=parseInt(durationArr[0])*60+parseInt(durationArr[1]);
var newSong = {
 id: id,
 title: title,
 album: album,
 artist: artist,
 duration: duration,
};

  player.songs.push(newSong);
  return id;
}

function removePlaylist(id) {
  var wantedplay = player.playlists.find(res => res.id == id);

  let index = player.playlists.indexOf(wantedplay);
  if(index ===-1){
    throw new Error("ID not found");
  }

  player.playlists.splice(index,1);
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


