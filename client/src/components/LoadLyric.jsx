import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
const LoadLyric = ({musicData, currentSongIndex, currentTime}) => {
  const lyricRef = useRef();
  const [musicLyric, setMusicLyric] = useState([]);

  useEffect(() => {
    if (musicData && musicData.length > 0) {
      const songApiJson = musicData[currentSongIndex].json;
      axios.get(songApiJson)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // console.log('i want result', result.lyrics);
        setMusicLyric(result.lyrics)
      })
    }
  },[currentSongIndex])

  console.log('currentTime', currentTime);
  return (
    <div id="lyrics">
          <div ref={lyricRef} id="lyrics-content">
          </div>
     </div>
  )
}


export default LoadLyric;