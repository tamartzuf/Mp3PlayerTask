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
  if(arguments < 2 || id===undefined)
  {
    id=1;
    player.playlists.forEach(element=> {
      id+=element.id;
    });
  }
  player.playlists.forEach (element => {
    if(id===element.id){
      throw new Error("ID is already exist");
    }
  });
  var newPlay={
    id: id, name: name , songs: []
  };
  player.playlists.push(newPlay);
  return id;
}

function playPlaylist(id) {
 var wantedPlay=player.playlists.find(element=> element.id==id) ;
var index = player.playlists.indexOf(wantedPlay);

 if(index===-1)
 {
   throw new Error("ID is not exist");
 }
wantedPlay.songs.forEach(element => playSong(element));

}

function editPlaylist(playlistId, songId) {
  var wantedPlay=player.playlists.find(element => element.id==playlistId) ;
  var indexP = player.playlists.indexOf(wantedPlay);

 if(indexP===-1)
 {
   throw new Error("ID playlist is not exist");
 }
 var wantedSong=player.songs.find(element => element.id==songId) ;
 var indexS = player.songs.indexOf(wantedSong);

  if(indexS===-1)
  {
    throw new Error("ID song is not exist");
  }

  var indexSongPlaylist = player.playlists[indexP].songs.indexOf(songId);
  if(indexSongPlaylist===-1){
      player.playlists[indexP].songs.push(songId);

  }else if(player.playlists[indexP].songs.length === 1){
    player.playlists.splice(indexP, 1);
  }else{
    player.playlists[indexP].songs.splice(indexSongPlaylist, 1);
  }
}

function playlistDuration(id) {
  var sum=0;
  var wantedPlaylist= player.playlists.find(element => element.id==id) ;
  for(let i=0; i<wantedPlaylist.songs.length; i++){
    var wantedSong =  player.songs.find(elem=> elem.id==wantedPlaylist.songs[i]);
    sum += wantedSong.duration;
  }
  return sum;

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


