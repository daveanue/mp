import React, {useState, useRef, useEffect} from 'react';
import MusicController from './MusicController';

const PlayMusic = ({song}) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    }
  }, [song, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calcTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinute} : ${returnSeconds}`;
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty('width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }
  const SkipSong = (forwards = true) => {
    if (forwards) {

    }
  }

  return (
    <React.Fragment>
      <audio src={song} preload='metadata' ref={audioPlayer}></audio>
      <MusicController
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={(duration && !isNaN(duration) ? calcTime(duration) : null)}
        forwardedRef={progressBar}
        changeRange={changeRange}
      />
    </React.Fragment>
  )
}


export default PlayMusic;