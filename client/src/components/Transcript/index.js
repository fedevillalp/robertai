import React, { Component } from "react";
import axios from 'axios';
import TranscriptTextBox from '../TranscriptTextBox'
import { Redirect, withRouter } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Transcript extends Component {
  state = {
    transcript: "",
    audioJobID: "",
    audioJobStatus: "",
    fileInfo: null,
    status: null
  };

  componentDidMount(){
    axios.get("/api/fileInfo/revai_job_id/"+this.props.match.params.fileInfoId)
      .then(response => {
        this.setState({ 
            audioJobID: response.data.fileInfo.revai_job_id,
            fileInfo: response.data
        });
        this.getTranscriptText(response.data.fileInfo.revai_job_id);
    })
  }

  getTranscriptText = (audioJobID) => {
    axios.get("/api/motivation/getTranscriptText/" + audioJobID)
      .then(response => {
        this.saveTranscriptTexttoDB(audioJobID, response.data); //save transcript to DB
        this.setState({ transcript: response.data});
        this.props.getTranscript(response.data);  //sets the state of transcript to response.data in app.js component
      });
  }

  //Save transcript to database
  saveTranscriptTexttoDB = (audioJobID,transcript) => {
    
    const postData = {audioJobID: audioJobID, transcript:transcript}

    axios.post("/api/motivation/saveTranscriptText", postData)
      .then(response => {
          // Got here, we should have a saved transcript
          console.log("*CONSOLE* Saved! response:", response);
          this.setState({ status: "saveTranscripttext success!" });
        })
      .catch(err => {
        this.setState({ status: "Error when saveTranscripttext!" });
        })
  }

 
  render() {
    
    return (
      <span>
        <TranscriptTextBox transcript = {this.state.transcript}/>
      </span>
    );
  }
}

export default withRouter(Transcript);


