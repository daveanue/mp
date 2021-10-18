import React, {useState, useRef, useEffect} from 'react';

const MusicController = ({isPlaying, duration, togglePlayPause, currentTime, forwardedRef, changeRange}) => {
    return (
      <div id="player">
      <div id="bar">
        <div id="currentTime">{currentTime}</div>
        <div id='progress-bar'>
        {/* <div id='progress' ref={forwardedRef}><i id="progressButton" className="fa fa-circle"/></div> */}
        <input id='progress' type='range' ref={forwardedRef} defaultValue='0' onChange={changeRange}></input>
        </div>
          <div id="totalTime">{duration}</div>
      </div>
      <div id="menu">
        <button id="prev"><i className="fa fa-step-backward"></i></button>
        <button id="play-pause" onClick={togglePlayPause}><i className={!isPlaying ? 'fa fa-play' : 'fa fa-pause'}></i></button>
        <button id="next"><i className="fa fa-step-forward"></i></button>
      </div>
    </div>
    )
}

export default MusicController;