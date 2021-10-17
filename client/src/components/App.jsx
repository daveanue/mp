import React from 'react';
import axios from 'axios';
import Loadmusic from './Loadmusic'
import PlayMusic from './PlayMusic'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicData: [],
      musicList: [],
      loadSelectMusic: null,
      currentSongIndex: null,
      nextSongIndex: null,
      currentMusic: null
    }
    this.getMusicData = this.getMusicData.bind(this);
    this.loadSelectMusic = this.loadSelectMusic.bind(this);
    this.setNextSong = this.setNextSong.bind(this);
  }
  getMusicData() {
    axios.get('https://jewel998.github.io/playlist/playlist.json')
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.error(err);
    })
    .then((json) => {
      const musicList = json.songs.map((item) => {
        return item.audio;
      })
      this.setState({
        musicData: json.songs,
        musicList: musicList
      });
    })
  }
  setNextSong() {
  const setNextSong = () => {
    if (this.state.currentSongIndex) {
      if (this.state.currentSongIndex + 1 > this.musicList.length - 1) {
        return 0;
      } else {
        return this.state.currentSongIndex + 1;
      }
    }
   }
   this.setState({nextSongIndex: setNextSong})
  }
  loadSelectMusic(src) {
    // console.log('the current musicList', this.state.musicList);
    const currentSongIndex = this.state.musicList.indexOf(src)
    const currentMusic = this.state.musicList[currentSongIndex]
    this.setState({
      loadSelectMusic: src,
      currentSongIndex: currentSongIndex,
      currentMusic: currentMusic
    }, () => {console.log('what is currentMusic', this.state.currentMusic)})
  }

  componentDidMount() {
    this.getMusicData();
    this.setNextSong();
  }
  render() {
    return (
      <React.Fragment>
        <Loadmusic
        musicList={this.state.musicData}
        loadSelect={this.loadSelectMusic}
        />
        <PlayMusic
          song={this.state.currentMusic}
        />
      </React.Fragment>
    )
  }
}