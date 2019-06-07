import React from "react";
import RegistrationBox from "../components/RegistrationBox";

export default class FrontPage extends React.Component {
  render() {
    return (
      <div>
        <RegistrationBox history={this.props.history}/>
      </div>
    )
  }
}

// <div  className="diagram"><img src={ require('./images/Speech-Recognition-Diagram.png') } alt="Speech REcognition Diagram" height= "700px"/></div> 