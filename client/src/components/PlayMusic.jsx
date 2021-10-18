import React, {useState, useRef, useEffect} from 'react';
import MusicController from './MusicController';

const PlayMusic = ({song}) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (song) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      console.log('what is the progress bar', progressBar.current);
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


  const SkipSong = (forwards = true) => {
    if (forwards) {

    }
  }

  return (
    <React.Fragment>
      <audio src={song} preload='metadata' ref={audioPlayer}></audio>
      {/* <div id="player">
      <div id="bar">
        <div id="currentTime">{currentTime}</div>
        <div id='progress-bar'> */}
        {/* <div id='progress' ref={forwardedRef}><i id="progressButton" className="fa fa-circle"/></div> */}
        {/* <input id='progress' type='range' ref={progressBar} defaultValue='0' onChange={changeRange}></input>
        </div>
          <div id="totalTime">{(duration && isNaN(duration)) && calcTime(duration)}</div>
      </div> */}

      {/* <div id="menu">
        <button id="prev"><i className="fa fa-step-backward"></i></button>
        <button id="play-pause" onClick={togglePlayPause}><i className={!isPlaying ? 'fa fa-play' : 'fa fa-pause'}></i></button>
        <button id="next"><i className="fa fa-step-forward"></i></button>
      </div>
    </div> */}
      <MusicController
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        currentTime={calcTime(currentTime)}
        duration={(duration && !isNaN(duration) ? calcTime(duration) : null)}
        forwardedRef={progressBar}
        changeRange={changeRange}
      />
    </React.Fragment>
  )
}


export default PlayMusic;