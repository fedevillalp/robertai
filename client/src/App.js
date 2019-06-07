import React, { Component } from "react";
import Transcript from "./components/Transcript";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar";
import BarChart from "./components/barChart";
import BarChartWordMap from "./components/BarChartWordMap";
import TextFields from "./components/Textfields";
import RegistrationPage from "./pages/registrationpage";
import Uploader from "./components/Uploader";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import loginController from "./controllers/LoginController"
import FileInfoList from "./components/FileInfoList";
import UploadPage from "./pages/UploadPage";
import NumberSelector from "./components/NumberSelector";
import wordmap from "./Algorithms/wordmap";
import sentenceFinder from "./Algorithms/sentenceFinder";
import ScrollTabSentence from "./components/ScrollTabSentence";



class App extends Component {

  state = {
    words: [],
    topWords: null,
    top_words_sorted: null,
    found_sentences: null,
    data: [],
    wordMapData: [],
    transcript: "Your transcript will appear here",
    user: null,
    fileList: null
  };

  //Authentication Methods

  componentDidMount() {
    loginController.addUserChangedListener(this.setUser);
    loginController.recheckLogin();
  }

  componentWillUnmount() {
    console.log("WillUnmount");
    loginController.removeUserChangedListener(this.setUser);
  }

  setUser = (user) => {
    console.log("setUser", user);
    this.setState({ user: user });
  }

  // createWordMapData = (wordListandNumbers,wordsSorted) => {
  //   //this function formats the most repeated words
  //   //in data format ready to plot
  
  //   let data = [];
  
  //     for (let i = 0; i < wordsSorted.length; i++) {
  //       if(wordsSorted[i]!=""){
  //         data.push({
  //           name: wordsSorted[i], repeated: wordListandNumbers[wordsSorted[i]]
  //         })
  //       }
  //     }
  
  //     //Update state to refresh chart
  //   this.setState({
  //     wordMapData: data
  //   });
  //     console.log('wordmapdata:',data);
  
  // }

  //  wordMap = (text)=> {
  //   //This function received a text string and returns 
  //   // one object of word:times_repeated pairs for all words
  //   // and one vector in the order ot repetition from high to low
  //   console.log('This is wordmap !!!*****')
  //   let textArray = text.split(" ");
  //   let wordContainer = [];
  //   let keysSorted = null;
    
  //   for(let i=0; i<textArray.length;i++){
  //     wordContainer[textArray[i]] = (wordContainer[textArray[i]] || 0 ) + 1; //use key value pairs 
  //   }
    
  //   keysSorted = Object.keys(wordContainer).sort(function(a,b){return wordContainer[b]-wordContainer[a]})
    
  //   this.createWordMapData(wordContainer,keysSorted)
  //   //return {wordContainer, keysSorted};
  // }

  //get topWords (a scalar) from menu selector to know how many words to use for wordMap
  updateTopWords = (topWords) => {
    //this.wordMap(this.state.transcript);
    let data = wordmap.wordMap(this.state.transcript,topWords);
    data.keysSorted.shift() //top words sorted except the first one
    console.log('******* top words sorted',data.keysSorted);
    let found_sentences = sentenceFinder.sentenceFinder(this.state.transcript,data.keysSorted);
    console.log("####CONSOLE",found_sentences);
    this.setState({
      topWords: topWords, 
      wordMapData: data.data, 
      top_words_sorted: data.keysSorted,
      found_sentences: found_sentences
    });
  }

  //Called from within <TextFields/> component provides words in input text box
  updateResults = (wordstoCount) => {

    this.setState({
      words: wordstoCount
    });

    this.wordCount(this.state.transcript, wordstoCount.toString().trim())
  }

  getTranscript = (transcript) => {
    // console.log('getTranscript text', transcript)
    this.setState({ transcript: transcript })

  }

  uploaderUrlChanged = url => {
    this.setState({ uploaderUrl: url });
  }

  //Receives a string with transcript and string with words to search
  wordCount = (text, words) => {

    let counter = 0;
    let textArray = text.split(" ");
    let searchTerms = words.split(" ");
    let result = [];

    for (let k = 0; k < searchTerms.length; k++) {
      for (let i = 0; i < textArray.length; i++) {
        if (textArray[i] === searchTerms[k]) {
          counter++;
        }
      }
      result[k] = counter;
      counter = 0;
    }

    this.createObject(result, searchTerms)
    return result;

  }

  //takes wordCount results creates object and updates state to refresh chart
  createObject = (result, searchTerms) => {

    let data = [];

    for (let i = 0; i < searchTerms.length; i++) {
      data.push({
        name: searchTerms[i], pv: result[i]
      })
    }

    //Update state to refresh chart
    this.setState({
      data: data
    });
  }

  render() {

    let words = this.state.words.toString().trim()

    return (
      <Router>
        <Navbar loginController={loginController} />
        <br /><br />
        <Switch>
          {!this.state.user && <Route path="/RegistrationPage" component={RegistrationPage} />}
          {!this.state.user && <Route path="/LoginPage/:reason?" component={LoginPage} />}
          {!this.state.user && <Route exact path="/" component={FrontPage} />}

          {this.state.user && <Route exact path="/UserHomePage" render={props =>
            <UploadPage user_id={this.state.user.id} /> 
              }
            />}

            
          
          {this.state.user && <Route exact path='/Results/:fileInfoId?' render={props =>
            <div>
              <div className="container">
                  <div className="row ">
                        <div className="col col-lg-12">
                          
                          <div class="jumbotron jumbotron-fluid">
                              <div class="container">
                                <p class="lead">Transcription Results</p>
                                <Transcript getTranscript={this.getTranscript} />
                              </div>
                          </div>

                        </div>
                  </div>
                  
                  <div className="row ">
                        <div className="col col-lg-12">
                          <div class="jumbotron jumbotron-fluid">
                              <div class="container">
                                <p class="lead">Custom Word Counter</p>
                                <TextFields updateResults={this.updateResults} />
                                <br></br>
                                <BarChart data={this.state.data} />
                              </div>
                          </div>
                        </div>
                  </div>

                  <div className="row ">
                        <div className="col col-lg-12">
                          <div class="jumbotron jumbotron-fluid">
                                <div class="container">
                                  <p class="lead">Most Repeated Words</p>
                                  <NumberSelector updateTopWords={this.updateTopWords}/>
                                  <BarChartWordMap data={this.state.wordMapData} />
                                </div>
                          </div>
                        </div>
                  </div>
                  <div className="row ">
                        <div className="col col-lg-12">
                            <div class="jumbotron jumbotron-fluid">
                                    <div class="container">
                                      <p class="lead">Sentence Search by Word</p>
                                      <ScrollTabSentence 
                                        top_words_sorted={this.state.top_words_sorted}
                                        found_sentences={this.state.found_sentences}
                                      />
                                    </div>
                            </div>
                        </div>
                  </div>
              </div>
            </div>
          } />}
          
        </Switch>
      </Router>
    );
  }
}

export default App;

{/* { this.state.user ? <div>User: {this.state.user.username} UserID: {this.state.user.id}</div> : null } */ }



