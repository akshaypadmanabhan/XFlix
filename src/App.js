import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import VideoPageView from "./Components/VideoPage/VideoPage"
import LandingPage from "./Components/LandingPage/LandingPage"



function App() {
  return (
    <div className="App">
      <React.StrictMode>
       <Switch>
            <Route exact path ="/" component={LandingPage} />
            <Route path="/video/:id" component={VideoPageView} /> 
      </Switch>
    </React.StrictMode>
    </div>
  );
}

export default App;