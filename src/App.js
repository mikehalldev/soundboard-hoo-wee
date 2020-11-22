// Used with love from the following codepen
// https://codepen.io/christianhoward/pen/jYLzRq/?editors=0010
// thank you!
import './App.css';
import React from 'react';
import baby from './static/sounds/baby.mp3'
import boy_oh_boy from './static/sounds/boy_oh_boy.mp3'
import f from './static/sounds/f.mp3'
import hoo from './static/sounds/hoo.mp3'
import oooo from './static/sounds/oooo.mp3'
import wah_wah from './static/sounds/wah_wah.mp3'
import WAH from './static/sounds/WAH.mp3'
import woah_woah from './static/sounds/woah_woah.mp3'
import yea from './static/sounds/yea.mp3'

// Hit the gear icon to the left of JS in the header to open JavaScript settings

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: {
        sound: null,
        soundName: null,
        currentlyPlaying: null
      }
    }
  }

  playSound(id) {
    if (this.state.audio.currentlyPlaying) {
      let snd = this.state.audio.sound;
      snd.pause();
    }
    let sound = this.props.sounds.find(sound => { return sound.id === id });
    let snd = new Audio(sound.soundURL);
    this.setState({ audio: { sound: snd, soundName: sound.soundName, currentlyPlaying: true } });
    snd.play();

    let data = [...this.props.sounds];
    const index = data.findIndex(obj => obj.soundName === sound.soundName);
    data[index].isPlaying = true;
    this.setState(data);

    snd.addEventListener('ended', this.soundListener.bind(this, data, index, snd));
  }

  soundListener(data, index, snd) {
    const newData = [...data];
    newData[index].isPlaying = false;
    this.setState(newData);
    snd.removeEventListener('ended', this.soundListener);
  }

  renderSounds() {
    return this.props.sounds.map(sound => {
      return <Sound key={sound.id} sound={sound} audio={this.state.audio} playSound={this.playSound.bind(this)} />
    })
  }
  render() {
    return (
      <div className="appContainer">
        {this.renderSounds()}
      </div>
    )
  }
};

class Sound extends React.Component {
  render() {
    let speakerStyle = 'fa fa-volume-off fa-3x';
    if (this.props.sound.isPlaying && this.props.sound.soundName === this.props.audio.soundName && this.props.audio.currentlyPlaying) {
      speakerStyle += 'fa fa-volume-up fa-3x';
    }
    return (
      <div className='sound-card'
        onClick={() => this.props.playSound(this.props.sound.id)}>
        <h3>{this.props.sound.soundName}</h3>
        <div>
          <div className="image-container">
            <i className={speakerStyle} aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds: [
        { id: 1, soundName: '', soundURL: hoo, isPlaying: false },
        { id: 2, soundName: '', soundURL: boy_oh_boy, isPlaying: false },
        { id: 3, soundName: '', soundURL: f, isPlaying: false },
        { id: 4, soundName: '', soundURL: yea, isPlaying: false },
        { id: 5, soundName: '', soundURL: baby, isPlaying: false },
        { id: 6, soundName: '', soundURL: oooo, isPlaying: false },
        { id: 7, soundName: '', soundURL: woah_woah, isPlaying: false },
        { id: 8, soundName: '', soundURL: wah_wah, isPlaying: false },
        { id: 9, soundName: '', soundURL: WAH, isPlaying: false },
      ]
    }
  }
  render() {
    return (
      <div className="app">
        <h1 className="App-header">Hooooo boy oh boy</h1>
        <p>y'all should turn your volume up and touch these squares</p>
        <Board sounds={this.state.sounds} audio={this.state.audio} />
      </div>
    );
  }
};


export default App;
