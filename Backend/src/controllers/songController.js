import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';
// import {CloudinaryStorage} from 'multer-storage-cloudinary'
// import songModel from '../models/songModel'
 
const addSong = async(req,res) =>{
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"});    // to upload audio files on cloudinary, we use resource_type: "video" bcoz cloudinary doesn't contains  resource_type: "audio"
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});    // to upload audio files on cloudinary, we use resource_type: "video" bcoz cloudinary doesn't contains  resource_type: "audio"
        const duration = `${Math.floor(audioUpload.duration/60)}: ${Math.floor(audioUpload.duration%60)}`
        // console.log(name,desc,album,audioUpload,imageUpload );

        const songData = {
            name,
            desc,
            album,
            file: audioUpload.secure_url,
            image: imageUpload.secure_url,
            duration
        }
//To save the data to database
        const song = songModel(songData);
        await song.save();

        res.json({success:true, message:'Song Added'});
    } catch (error) {
        res.json({success:false});
    }
}

const listSong = async(req, res) =>{
    try {
        const allSongs = await songModel.find({});
        res.json({success:true,songs:allSongs});
        
    } catch (error) {
        res.json({success:false,})
    }
}

const removeSong = async(req,res) =>{
    try {
        await songModel.findByIdAndDelete(req.body.id); //to delete the particular song
        res.json({success:true, message:'Song Deleted'});
    } catch (error) {
        res.json({success:true});
    }
}

export { addSong, listSong, removeSong };
