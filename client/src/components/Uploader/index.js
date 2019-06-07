import React, { Component } from 'react';
import axios from 'axios';
import UploadButton from '../UploadButton';

//**********************************

//Gets called at <App.js>
//Gets and sends audio file pointer to /api/upload
 
//**********************************

const inputStyle = {
  float: 'left',
  margin: '12px',
  border: '1px solid gray',
  background: 'white',
  color: 'gray',
  borderRadius: '2px'
};

const outerInputStyle = {
  //border: '1px solid gray',
  paddingLeft: '160px',
};

class Uploader extends Component {
  state = { link_to_audio: null, job_status: null }  //Do we need the state here ?

  // Get file from user
  // File input fields cannot be controlled by React since React cannot set their value
  // So we will hold a reference to it so we can access the field later
  // https://reactjs.org/docs/refs-and-the-dom.html
  // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
  fileInput = React.createRef();  
  
  // Sent in <UploadButton/>'s props
  uploadFile = () => {
    
    //Has a file been selected ? 
    if (!this.fileInput.current.files.length) {
      console.log('No file was selected');
      return;
    }

    // Grab file from the reference
    const file = this.fileInput.current.files[0];

    // Build FormData to submit to server at /api/upload
    const data = new FormData()
    data.append('file', file);

    console.log('This is the file that has been selected:', file);

    // If you want to add any extra info to this post
    data.append('description', 'blah blah blah');
    data.append('user_id', this.props.user_id); //user_id comming from App

    console.log("data" + data);

    // Send audio file pointer to our upload API route 
    // which a) uploads to cloudinary b) makes call to REVai 
    // and c) returns cloudinary storage link and revai job status
    axios.post('/api/upload', data).then((response) => {
      this.setState({
        link_to_audio: response.data.link_to_audio,   //Do we need the state here ?
        job_status: response.data.job_status  //Do we need the state here ?
      })
      window.location.reload();    //TO DO: Remove line 55. <FileInfoList/> already called from App.js 
    })
  }
    
  render() {
    return(
      <div>
          <div className="row ">
                        <div className="col col-lg-12">
                          
                          <div class="jumbotron jumbotron-fluid" >
                              <div class="container" style={outerInputStyle} >
                                <input type="file" ref={this.fileInput} style={inputStyle} />
                                <UploadButton uploadFile={this.uploadFile} style={inputStyle}/> 
                              </div>
                          </div>
                          
                        </div>
            </div>
      </div>
    )
  }
}

export default Uploader