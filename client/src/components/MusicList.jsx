import React from 'react';
import Music from './Music'
const MusicList = ({musics, loadSelect}) => {
  return (
  <div id='flex-container'>
    {musics.map((music, i) => {
      return (
       <Music
         key={i}
         album={music.albumart}
         author={music.author}
         lyrics={music.json}
         audioSrc={music.audio}
         loadSelect={loadSelect}
       />
      )
    })}
  </div>
  )
}

export default MusicList