import React, {useState, useRef, useEffect} from 'react';

const MusicController = ({isPlaying, duration, togglePlayPause, forwardedRef, changeRange}) => {
    return (
      <div id="player">
      <div id="bar">
        <div id="currentTime">0</div>
        <div id='progress-bar'>
        <div id='progress' ref={forwardedRef}><i id="progressButton" className="fa fa-circle"/></div>
        </div>
          <div id="totalTime">{duration}</div>
      </div>
      <div id="menu">
        <button id="repeat" style={{color: 'grey'}}><i className="fa fa-repeat"></i></button>
        <button id="prev"><i className="fa fa-step-backward"></i></button>
        <button id="play-pause" onClick={togglePlayPause}><i className={!isPlaying ? 'fa fa-play' : 'fa fa-pause'}></i></button>
        <button id="next"><i className="fa fa-step-forward"></i></button>
        <button id="shuffle" style={{color: 'grey'}}><i className="fa fa-random"></i></button>
      </div>
    </div>
    )
}

export default MusicController;