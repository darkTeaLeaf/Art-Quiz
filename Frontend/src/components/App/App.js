import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useLocation
} from "react-router-dom";
import Home from "../../routes/home";
import Auth from "../../routes/auth";
import Account from "../../routes/account";
import Logo from "../UI/Logo";
import Avatar from "../UI/Avatar";
import { signOut, getUserData } from "../../actions/accountActions";

const Header = ({ isAuthenticated, avatar, signOut }) => {
  let location = useLocation();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <Logo fontSize="45px" />
        </Link>

        {location.pathname !== "/account" &&
          (isAuthenticated ? (
            <Link to="/account">
              <Avatar
                src={avatar}
                width="35px"
                height="35px"
                rounded
                borderWidth="3px"
              />
            </Link>
          ) : (
            <Link to="/auth">
              <img
                src={process.env.PUBLIC_URL + "/img/profile.svg"}
                alt="profile"
                width="35px"
                height="35px"
              />
            </Link>
          ))}

        {isAuthenticated && location.pathname === "/account" && (
          <Link to="/" onClick={signOut}>
            <span className="sign-out">Sign out</span>
          </Link>
        )}
      </div>
    </header>
  );
};

const App = ({ isAuthenticated, avatar, signOut, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  return (
    <BrowserRouter>
      <div id="App">
        <Header
          isAuthenticated={isAuthenticated}
          avatar={avatar}
          signOut={signOut}
        />

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
  isAuthenticated: store.account.isAuthenticated,
  avatar: store.account.userData.avatar
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  getUserData: () => dispatch(getUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
