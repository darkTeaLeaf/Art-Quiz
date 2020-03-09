import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "../../routes/home";
import Account from "../../routes/account";

const App = () => {
  return (
    <BrowserRouter>
      <div id="App">
        <Link to="/">home</Link>
        <Link to="/account">account</Link>

        <Switch>
          <Route path="/account">
            <Account />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect()(App);
