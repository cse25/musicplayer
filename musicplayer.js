// Your task is to architect the functionality of a music player in Javascript. Your music player should consist of these parts: 
// ​
// A player that has a library and a playlist.
//   - A library can have songs added/removed and cannot have duplicates
//   - A song needs to have a title, artist, album name, and cover art
//   - A playlist has songs added/removed from the library and can have duplicates. 
//     Songs can also be reordered in the playlist. 
// ​
// ​
// A user should be able to:
//   -Add/Remove a song from the library
//   -Take a song from the library and add/remove to the playlist 
//   -Swap the order of songs in the playlist
//   -Use player controls stop/start/next to change the current song in the player
// ​
// All other implementation details will be left to you.


// Song constructor (not needed in this version)
// var Song = function(title, artist, albumName, coverArt) {
// 	this.title = title;
// 	this.artist = artist;
// 	this.albumName = albumName;
// 	this.coverArt = coverArt;
// }

//Library class constructor
var Library = function(name) {
    this.storage = {};
    this.name = name;
}

Library.prototype.addSong = function(song) {
    for (var key in this.storage) {
        if (key === song.title) {
            console.log('Error adding song. ' + song.title + ' already exists in ' + this.name);
            return;
        }
    }
    this.storage[song.title] = new Song(song);
    console.log(song.title + " has been added to " + this.name);
};

Library.prototype.removeSong = function(song) {
    for (var key in this.storage) {
        if (key === song.title) {
            delete this.storage[song.title];
            console.log(song.title + " has been removed from " + this.name);
            return;
        }
    }
    console.log("Error removing song. " + song.title + " does not exist in " + this.name);
};


//Playlist Class Constructor
var Playlist = function(name) {
    this.playlist = [];
    this.name = name;
    this.currentSong = this.playlist[0] || null;
}

Playlist.prototype.addToPlaylist = function(song) {
    this.playlist.push(song);   
}

//Fisher-Yates in place shuffle
Playlist.prototype.shufflePlaylist = function() {
  var array = this.playlist;
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
};

Playlist.prototype.nextSong = function() {
	if (!this.currentSong) {
		this.currentSong = this.playlist[0];
	} else {
		var index = this.playlist.indexOf(this.currentSong);
		this.currentSong = this.playlist[index++];
	}
}


//Player Class Constructor
var Player = function(name) {
    this.name = name;
    this.state = 'stopped';
}

Player.prototype.play = function() {
    this.state = 'playing';
}

Player.prototype.pause = function() {
    this.state = 'paused';
}



var initModule = function() {
    var chrisLibrary = new Library("Chris' Library");
    var chrisPlaylist = new Playlist("Chris' Playlist");
    var chrisPlayer = new Player("Chris' Player");
    var printLibrary = function(){console.log('Current Library: ', chrisLibrary)};
    var printPlaylist = function(){console.log('Current Playlist: ', chrisPlaylist)};
    var printCurrentSong = function(){console.log('Current Song: ', chrisPlaylist.currentSong)};
    var printSongStatus = function(){console.log('Song Status: ', chrisPlayer.state)};
    return {
        addSong: chrisLibrary.addSong.bind(chrisLibrary),
        removeSong: chrisLibrary.removeSong.bind(chrisLibrary),
        playSong: chrisPlayer.play.bind(chrisPlayer),
        pauseSong: chrisPlayer.pause.bind(chrisPlayer),
        nextSong: chrisPlaylist.nextSong.bind(chrisPlaylist),
        addToPlaylist: chrisPlaylist.addToPlaylist.bind(chrisPlaylist),
        shufflePlaylist: chrisPlaylist.shufflePlaylist.bind(chrisPlaylist),
        printLibrary: printLibrary,
        printPlaylist: printPlaylist,
        printCurrentSong: printCurrentSong,
        printSongStatus: printSongStatus
    }
};

var app = initModule();

var impossibleGermany = {
    title:'Impossible Germany',
    artist: 'Wilco',
    albumName: 'Sky Blue Sky',
    coverArt: '<URL>'
}

var fakeEmpire = {
    title: 'Fake Empire',
    artist: 'The National',
    albumName: 'Boxer',
    coverArt: '<URL>'
}

var redEyes = {
    title: 'Red Eyes',
    artist: 'The War on Drugs',
    albumName: 'Lost in the Dream',
    coverArt: '<URL>'
}

var atNightInDreams = {
    title: 'At Night In Dreams',
    artist: 'White Denim',
    albumName: 'Corsicana Lemonade',
    coverArt: '<URL>'
}

//test app calls
app.addSong(impossibleGermany);
app.addSong(fakeEmpire);
app.addSong(redEyes);
app.addSong(atNightInDreams);
app.printLibrary();
app.addToPlaylist(atNightInDreams);
app.addToPlaylist(impossibleGermany);
app.addToPlaylist(fakeEmpire);
app.nextSong();
app.printPlaylist();
app.nextSong();
app.printCurrentSong();
app.playSong();
app.printSongStatus();
app.pauseSong();
app.printSongStatus();
app.shufflePlaylist();
app.printPlaylist();