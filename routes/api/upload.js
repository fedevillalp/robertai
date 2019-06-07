const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const router = require("express").Router();
const db = require("../../models"); 
const { RevAiApiClient } = require('revai-node-sdk');
const accessToken = process.env.REV_AI_ACCESS_TOKEN;
const client = new RevAiApiClient(accessToken);
require('dotenv').config();

//***********************************************************

//When <UploadButton/> in <Uploader/> is Clicked:
//Uploads file to cloudinary
//Gets link from cloudinary
//Sends job to RevAi
//Saves RevAi Job ID and Cloudinary File details to Database

//***********************************************************

// Configure cloudinary with information from your .env file
cloudinary.config({
cloud_name: process.env.CLOUDINARY_cloud_name,
api_key: process.env.CLOUDINARY_api_key,
api_secret: process.env.CLOUDINARY_api_secret 
});

// Multer helps us with multi-part form data (Forms with files)
// We're going to use memory storage since we're not saving to disk
// The file will be streamed from the upload straight to cloudinary via our middleware
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });

// Route:  /api/upload @ localhost 3001
// Receive files from the client
// Pass multer middleware
router.post('/', multerUpload.single('file'), (req, res) => {

    console.log('Got file with file_name:', req.file.originalname); //this is the filename
    console.log('Extra form fields:', req.body);

    // Send file to Cloudinary
    // resource_type should be "video" for audio files!
    // https://cloudinary.com/documentation/image_upload_api_reference
    cloudinary.uploader.upload_stream({ resource_type: "video" }, cloudinaryDone).end(req.file.buffer);
    // After the upload is completed, this callback gets called
    async function cloudinaryDone(error, result) {
      if (error) {
        console.log("Error in cloudinary.uploader.upload_stream\n", error);
        return;
      }

      let job = await client.submitJobUrl(result.url); // send file to REVAI
      
      db.UserData.create({ user_id: req.body.user_id, //save to database
          link_to_audio: result.url ,
          audio_file_name: req.file.originalname,
          audio_file_duration: result.duration,
          revai_job_id: job.id
         })
        .then(() => {
          //send URL to client for display
          //TO DO do we need to send this info? Already sent to Database
          res.json({ link_to_audio: result.url , revai_job_id : job.id, job_status : job.status});  
        })
    }

});

module.exports = router;
