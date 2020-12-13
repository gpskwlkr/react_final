import './app.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "../../views/home/home";
import Prediction from "../../views/prediction/prediction";

function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/prediction/:id">
                      <Prediction />
                  </Route>
                  <Route exact path="/">
                      <Home />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
