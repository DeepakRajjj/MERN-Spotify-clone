import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekbg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  // Default song
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);

  // Time state for current time and total duration
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });

  // Function to play the current track
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to pause the current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Function to play a track by ID
  const playWithId = async(id) => {
    const selectedTrack = songsData.find((item) => id === item._id);
    if (selectedTrack) {
      setTrack(selectedTrack);
      if (audioRef.current) {
        await audioRef.current.load();
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  // Function to play the previous track
  const previous = async() => {
    const currentIndex = songsData.findIndex((item) => track && track._id === item._id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      if (audioRef.current) {
        await audioRef.current.load();
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  // Function to play the next track
  const next = async() => {
    const currentIndex = songsData.findIndex((item) => track && track._id === item._id);
    if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      if (audioRef.current) {
        await audioRef.current.load();
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  // Function to seek the song based on click position
  const seekSong = (e) => {
    if (audioRef.current && seekbg.current) {
      const seekPosition = (e.nativeEvent.offsetX / seekbg.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = seekPosition;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setSongsData(response.data.songs || []);
        setTrack(response.data.songs ? response.data.songs[0] : null);
      }
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumsData(response.data.albums || []);
      }
    } catch (error) {
      console.error("Error fetching albums data:", error);
    }
  };

  // Update time and seek bar width on time update
  useEffect(() => {
    const updateSeekBar = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60)
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60)
          }
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateSeekBar;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.load();
      if (playStatus) {
        audioRef.current.play();
      }
    }
  }, [track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekbg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
