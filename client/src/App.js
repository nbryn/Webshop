import React, { Component } from "react";
import "./Resources/css/styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <div className="App">Hej</div>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
