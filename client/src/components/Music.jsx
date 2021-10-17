import React from 'react';

const Music = ({album, author, lyrics, audioSrc, loadSelect}) => {

  return(
  <div onClick={() => loadSelect(audioSrc)} id='flex-item'>
      <div style={{margin: 20}} className='author'>{author}</div>
    <img style={{width: 200, height: 200, borderRadius: 400/2}} src={`${album}`}/>
  </div>
  )

}


export default Music;