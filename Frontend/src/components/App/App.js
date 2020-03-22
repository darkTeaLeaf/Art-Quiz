import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "../../routes/home";
import Auth from "../../routes/auth";
import Account from "../../routes/account";
import { signOut } from "../../actions/accountActions";

const App = ({ isAuthenticated, signOut }) => {
  return (
    <BrowserRouter>
      <div id="App">
        <nav>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/auth">Log in</Link>
          )}
          {isAuthenticated && (
            <Link to="/" onClick={signOut}>
              Sign out
            </Link>
          )}
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/account" component={Account} />
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
