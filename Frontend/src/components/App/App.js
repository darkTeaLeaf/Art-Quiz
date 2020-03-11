import React, { useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "../../routes/home";
import Account from "../../routes/account";
import AuthForm from "../AuthForm";
import { signOut } from "../../actions/accountActions";

const App = ({ isAuthenticated, signOut }) => {
  const [isAuthFormActive, toggleAuthFormActive] = useState(false);

  const checkAuth = e => {
    if (!isAuthenticated) {
      e.preventDefault();
      toggleAuthFormActive(true);
    }
  };

  return (
    <BrowserRouter>
      <div id="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/account" onClick={checkAuth}>
            Account
          </Link>
          {isAuthenticated && <Link to="/" onClick={signOut}>Sign out</Link>}
        </nav>

        {isAuthFormActive && (
          <AuthForm toggleAuthFormActive={toggleAuthFormActive} />
        )}

        <Switch>
          <Route exact path="/" component={Home} />

          {isAuthenticated ? (
            <Route exact path="/account" component={Account} />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.account.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
