import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import Ranking from "./Rankings";
import Factor from "./Factors";
import Landing from "./landing";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

//react router template from Prac 6: Tables using ag-grid React,referenced
//navigation with react router
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/ranking">
          <Ranking />
        </Route>
        <Route path="/factor">
          <Factor />
        </Route>
        <Route path="/login">
          <App />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
