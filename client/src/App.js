import React, { Component } from "react";
import "./Resources/css/styles.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/index";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import { Provider } from "react-redux";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />

              <div className="App">Hej</div>
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
