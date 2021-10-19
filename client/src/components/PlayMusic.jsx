import React, {useState, useRef, useEffect} from 'react';
import MusicController from './MusicController';
import LoadLyric from './LoadLyric';
const PlayMusic = ({musicList, prevSongIndex, currentSongIndex, setNextSongIndex, musicData}) => {
  // console.log('what is current song', song);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      console.log('what is the progress bar', progressBar.current);
      progressBar.current.max = seconds;
  }, [currentSongIndex, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calcTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinute} : ${returnSeconds}`;
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }
  const whileMusicPlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whileMusicPlaying);
  }
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value)
  }

  const toggleToPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whileMusicPlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whileMusicPlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }




  return (
    <React.Fragment>
      <audio src={musicList[currentSongIndex]} preload='metadata' ref={audioPlayer}></audio>
       <LoadLyric
          musicData={musicData}
          currentSongIndex={currentSongIndex}
          currentTime={currentTime}
       />
      <MusicController
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        currentTime={calcTime(currentTime)}
        duration={(duration && !isNaN(duration) ? calcTime(duration) : null)}
        forwardedRef={progressBar}
        changeRange={changeRange}
        pause={toggleToPause}
        prev={prevSongIndex}
        next={setNextSongIndex}
      />
    </React.Fragment>
  )
}


export default PlayMusic;