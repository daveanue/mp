import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
const LoadLyric = ({musicData, currentSongIndex, currentTime}) => {

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


  },[currentSongIndex, musicLyric])

  return (
    <div id="lyrics">
          <div id="lyrics-content">
            {musicLyric.length > 0 &&  musicLyric.map((lyric, i, array) => {
               var next = i + 1;

              if (next > array.length) {
                next = next;
              } else {
                next = next - 1;
              }
              return (
                <h2
                key={i}
                className={(lyric.time / 1000)  >= currentTime  && currentTime <= (musicLyric[next].time / 1000) ? 'current' : null}
                >
                  {lyric.line}
                </h2>
              )
            })}
          </div>
     </div>
  )
}


export default LoadLyric;