import React from 'react';

export default class MusicController extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="player">
      <div id="bar">
        <div id="currentTime"></div>
        <div id="progress-bar">
          <div id="progress"><i id="progressButton" className="fa fa-circle"></i></div>
        </div>
        <div id="totalTime"></div>
      </div>
      <div id="menu">
        <button id="repeat" style={{color: 'grey'}}><i className="fa fa-repeat"></i></button>
        <button id="prev"><i className="fa fa-step-backward"></i></button>
        <button id="play"><i className="fa fa-play"></i></button>
        <button id="next"><i className="fa fa-step-forward"></i></button>
        <button id="shuffle" style={{color: 'grey'}}><i className="fa fa-random"></i></button>
      </div>
    </div>
    )
  }
}