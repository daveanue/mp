import React, {useState, useRef, useEffect} from 'react';
import MusicController from './MusicController';

const PlayMusic = ({song}) => {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  })

  const SkipSong = (forwards = true) => {
    if (forwards) {

    }
  }

  return (
    <React.Fragment>
      <audio src={song} ref={audioEl}></audio>
      <MusicController/>
    </React.Fragment>
  )
}


export default PlayMusic;