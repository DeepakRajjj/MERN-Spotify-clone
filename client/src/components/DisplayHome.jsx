import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
      const {songsData,albumsData} = useContext(PlayerContext);
  return (
   <>
   <Navbar/>

   {/* parent for the AlbumItem because we are passing props from here to AlbumItem */}
   <div className="mb-4">
    <h1 className="my-5 font-bold tetx-2xl">Featured Charts</h1>
    <div className="flex overflow-auto">
          {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
    </div>
    
   </div>

   <div className="mb-4">
    <h1 className="my-5 font-bold tetx-2xl">Today's biggest hits</h1>
    <div className="flex overflow-auto">
          {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
    </div>
   </div>
   </>
  )
}

export default DisplayHome