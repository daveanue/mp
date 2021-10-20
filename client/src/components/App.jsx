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
      currentSongIndex: 0,
      musicLyric: []
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
    .catch((err) => {
      console.error(err);
    })
  }



  setNextSong() {
      if (this.state.currentSongIndex + 1 > this.state.musicList.length - 1) {
        this.setState({currentSongIndex: 0})
      } else {
        const nextSongIndex = this.state.currentSongIndex + 1;
        this.setState({currentSongIndex: nextSongIndex})
      }
  }

  setPrevSong() {
    if (this.state.currentSongIndex - 1 >= 0) {
     const prevSongIndex = this.state.currentSongIndex - 1;
      this.setState({currentSongIndex: prevSongIndex})
    } else {
      const lastMusicIndex = this.state.musicList.length - 1;
      this.setState({currentSongIndex: lastMusicIndex});
    }
  }
  loadSelectMusic(src) {
    const currentSongIndex = this.state.musicList.indexOf(src)
    this.setState({
      loadSelectMusic: src,
      currentSongIndex: currentSongIndex,
    })
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
          musicList={this.state.musicList}
          prevSongIndex={this.setPrevSong}
          currentSongIndex={this.state.currentSongIndex}
          setNextSongIndex={this.setNextSong}
          musicData={this.state.musicData.length > 0 ? this.state.musicData : undefined}
        />
      </React.Fragment>
    )
  }
}