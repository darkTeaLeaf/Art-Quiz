import React, { useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "../../routes/home";
import Account from "../../routes/account";
import AuthForm from "../AuthForm";

const App = ({ isAuthenticated }) => {
  const [isAuthFormActive, setIsAuthFormActive] = useState(false);

  const checkAuth = e => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsAuthFormActive(true);
    }
  };

  return (
    <BrowserRouter>
      <div id="App">
        <Link to="/">Home</Link>
        <Link to="/account" onClick={checkAuth}>
          Account
        </Link>

        {isAuthFormActive && (
          <AuthForm setIsAuthFormActive={setIsAuthFormActive} />
        )}

        <Switch>
          <Route path="/account">
            {isAuthenticated ? <Account /> : <Redirect to="/" />}
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.account.isAuthenticated
});

export default connect(mapStateToProps)(App);
