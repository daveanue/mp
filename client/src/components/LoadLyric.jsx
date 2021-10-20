import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
const LoadLyric = ({musicData, currentSongIndex, currentTime}) => {

  const lyricRef = useRef()
  const h2Ref = useRef()
  const [musicLyric, setMusicLyric] = useState([]);

  const scrollToBottom = (lyricToScrollTo) => {
    lyricRef.current.scrollIntoView(lyricToScrollTo)
    lyricRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }

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
        scrollToBottom();

      }, [musicLyric, lyricRef, h2Ref])

    }
  },[currentSongIndex, musicLyric])

  return (
    <div ref={lyricRef} id="lyrics">
          <div id="lyrics-content">
            {musicLyric.length > 0 &&  musicLyric.map((lyric, i, array) => {
               var next = i + 1;
               const current = i;

              if (next > array.length) {
                next = next;
              } else {
                next = next - 1;
              }
              return (
                <h2
                ref={h2Ref}
                key={i}
                // id={musicLyric[i].time}
                className={parseInt(musicLyric[i].time / 1000) >= currentTime ? 'current' : null}
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