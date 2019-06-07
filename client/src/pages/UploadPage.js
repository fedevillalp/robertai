import React from "react";
import Uploader from "../components/Uploader";
import FileInfoList from "../components/FileInfoList";


export default class UploadPage extends React.Component {
  render() {
    return (
      <div>
        <div class="container">
                <div class="row ">
                              <div class="col col-lg-1">  
                              </div>
                              <div class="col col-lg-10">
                                <Uploader user_id={this.props.user_id} />
                              </div>
                              <div class="col col-lg-1">  
                              </div>
                            </div>
                            <br></br>
                            <div class="row ">
                              <div class="col col-lg-1">  
                              </div>
                              <div class="col col-lg-10">
                                <FileInfoList />
                              </div>
                              <div class="col col-lg-1">  
                              </div>
                            </div>
                </div>
      </div>
    
    )
  
  }
}