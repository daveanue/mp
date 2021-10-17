import React from 'react';
import MusicList from './MusicList';
export default class Loadmusic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMusicList: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
// onClick it should set the music that you click as the current Music
  handleClick(e) {
    const displayMusicList = this.state.displayMusicList
    this.setState({displayMusicList: !displayMusicList})
  }

  render() {
    const isDisplayMusicList = this.state.displayMusicList;

    return (
      <div>

      {isDisplayMusicList ?
      ( <div>
         <button onClick={this.handleClick}>Close Music List</button>
        <MusicList
        musics={this.props.musicList}
        loadSelect={this.props.loadSelect}
        />
        </div>
      ) :
      (<button onClick={this.handleClick}>Load Music</button>)
      }


      </div>
    )
  }
}