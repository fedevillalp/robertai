const router = require("express").Router();
const db = require("../../models"); 
const { RevAiApiClient } = require('revai-node-sdk');
require('dotenv').config();

const accessToken = process.env.REV_AI_ACCESS_TOKEN; 

// THIS GET REQUEST FINDS USER BY ID AND RETURNS ITS link_to_audio
// IT THEN USES THE link_to_audio to SUBMIT A JOB TO THE REV API
// You can test this route at http://localhost:3001/api/motivation
router.route("/").get(async function(req, res) {
  const client = new RevAiApiClient(accessToken);
  //console.log('this is the logged in userid',req.session.user_id)
  db.UserData
         .findOne({where: {user_id: req.session.user_id}}) // this should leter be the logged in usser 
         .then(async foundUser => {
            //console.log('this is the link sent to rev',foundUser.link_to_audio);
            let job = await client.submitJobUrl(foundUser.link_to_audio);
            res.json(job);
         });
});

router.route("/requestAudioJobStatus").post(async function(req, res) {
  try {
    // Audio job ID sent in body of the  POST request from client: req.body.audioJobID
    const client = new RevAiApiClient(accessToken);
    var jobDetails = await client.getJobDetails(req.body.audioJobID); // This one is transcrived and works always'zTHdxVpTraHX' // does not work with new token
    res.json(jobDetails);
  } catch(error) {
    console.log('This is /requestAudioJobStatus :  ',error);
  }
});

router.route("/getTranscriptText/:audioJobID").get(async function(req, res) {
  const client = new RevAiApiClient(accessToken);
  let audioJobID = req.param("audioJobID");
  var transcriptText = await client.getTranscriptText(audioJobID);
  res.json(transcriptText);
});

//SAVES THE TRANSCRIPT IN DB using jobID 
router.route("/saveTranscriptText").post(function(req,res){
  const { audioJobID, transcript } = req.body;
  //console.log('*CONSOLE LOG* This is route save transcript: ', audioJobID, transcript);
  db.UserData.update(
      {audio_transcript: req.body.transcript},
      {where: {revai_job_id:req.body.audioJobID} }
    )
    .then(function(rowsUpdated) {
      console.log('*CONSOLE*', rowsUpdated)
    })
  //res.json(audioJobID);
})

module.exports = router;


