import React, { Component } from "react";
import "./resources/css/styles.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "./Store";
import Home from "./components/Home";
import Layout from "./components/layout/index";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Dashboard from "./components/user/Dashboard";
import IsAuth from "./components/security/IsAuth";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/signin" component={IsAuth(SignIn, false)} />
              <Route exact path="/signup" component={IsAuth(SignUp, false)} />
              <Route exact path="/" component={IsAuth(Home, false)} />

              <Route
                exact
                path="/user/dashboard"
                component={IsAuth(Dashboard, true)}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
