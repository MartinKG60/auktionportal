import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
// import App from "./components/App";
import Create from "./components/auction/Create";
import List from "./components/auction/List";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <Header />
              <Route exact={true} path="/" component={List} />
              <Route exact={true} path="/auction/new" component={Create} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routes;
