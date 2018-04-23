class Player {
  constructor () {
    this.currentlyPlaying = album.songs[0];
    this.playState = 'stopped';
    this.volume = 80;
    this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
  }

  getDuration() {
    return this.soundObject.getDuration();
  }

  getTime() {
    return this.soundObject.getTime();
  }

  playPause (song = this.currentlyPlaying) {
    if (this.currentlyPlaying !== song) {
      // Stop the currently playing sound file (even if nothing is playing)
      this.soundObject.stop();
      // Clear classes on the song that's currently playing
      this.currentlyPlaying.element.removeClass('playing paused');

      // Update our currentlyPlaying and playState properties
      this.currentlyPlaying = song;
      this.playState = 'stopped';
      this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }
    if (this.playState === 'paused' || this.playState === 'stopped') { //checks to see if the sound object's state is paused or stopped
      this.soundObject.setVolume( this.volume ); // sets the sound objects volume to a percentage
      this.soundObject.play(); //plays current sound object
      this.playState = 'playing'; //changes object's state to playing
      this.currentlyPlaying.element.removeClass('paused').addClass('playing'); //r`emoves the paused class and adds the playing class
    } else {
      this.soundObject.pause(); //pauses current sound object and updates state and class to paused, removing the playing class
      this.playState = 'paused';
      this.currentlyPlaying.element.removeClass('playing').addClass('paused');
    }
  }

  skipTo (percent) { //skips to a specific part of the song
    if (this.playState !== 'playing') { return } //allows skipTo function to work on paused songs
    this.soundObject.setTime( (percent / 100) * this.soundObject.getDuration() ); //converts percentage to decimal, multiplies the decimal by the total song duration, and sets that as the new time
  }

  setVolume (percent) { //takes in the current percent number from the sound object
    this.volume = percent; //sets the sound objects volume property equal to the percent
    this.soundObject.setVolume(percent); //sets the DOM's audio player volume to the percent
  }
}

const player = new Player();
