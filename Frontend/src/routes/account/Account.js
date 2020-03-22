import React, { useEffect } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getUserData } from "../../actions/accountActions";

const Account = ({ isAuthenticated, userData, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  const { username, firstName, lastName, avatar } = userData;

  return isAuthenticated ? (
    <div id="Account">
      <ul>
        <li><img src={avatar} alt="user profile" width="200px" /></li>
        <li>{username}</li>
        <li>{firstName}</li>
        <li>{lastName}</li>
      </ul>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = store => ({
  userData: store.account.userData,
  isAuthenticated: store.account.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => dispatch(getUserData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
