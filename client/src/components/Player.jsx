import React, { useContext } from 'react';
import { assets } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {
    track,
    seekBar,
    seekbg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    audioRef
  } = useContext(PlayerContext);

  // Format time function
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className="hidden lg:flex items-center gap-4">
        {/* Song Information */}
        <img className='w-12' src={track.image} alt="Song Thumbnail" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-1 m-auto">
        {/* Play Controls */}
        <div className="flex gap-4">
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="Previous" />
          
          {/* Toggling Play & Pause */}
          {playStatus ? (
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="Pause" />
          ): (
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="Play" />
          ) }

          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="Next" />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="Loop" />
        </div>
        
        {/* Seek Bar */}
        <div className="flex items-center gap-5">
          <p>{formatTime(time.currentTime.minute * 60 + time.currentTime.second)}</p>
          <div ref={seekbg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
          </div>
          <p>{formatTime(time.totalTime.minute * 60 + time.totalTime.second)}</p>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        {/* Additional Controls */}
        <img className='w-4' src={assets.play_icon} alt="Play" />
        <img className='w-4' src={assets.mic_icon} alt="Mic" />
        <img className='w-4' src={assets.queue_icon} alt="Queue" />
        <img className='w-4' src={assets.speaker_icon} alt="Speaker" />
        <img className='w-4' src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className='w-4' src={assets.mini_player_icon} alt="Mini Player" />
        <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  ) : null;
};

export default Player;
