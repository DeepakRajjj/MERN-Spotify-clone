import React, { useState } from 'react';
import { assets } from '../assets/admin-assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App'; // Assuming you have defined 'url' in your App file

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("bgColour", colour);
      formData.append("name", name);
      formData.append("desc", desc);
      
      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success("Album added");
        setDesc("");
        setName("");
        setColour("#121212");
        setImage(false);
      } else {
        toast.error("Failed to add album");
      }
    } catch (error) {
      toast.error("Error occurred while adding album");
    }
    setLoading(false);
  }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" accept='image/*' hidden id="image" />
        <label htmlFor="image">
          <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background colour</p>
        <input onChange={(e) => setColour(e.target.value)} value={colour} type="color" />
      </div>

      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>ADD</button>
    </form>
  )
}

export default AddAlbum;