import React, { useEffect } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getUserData } from "../../actions/accountActions";

const Account = ({ isAuthenticated, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  return isAuthenticated ? (
    <div id="Account">Account page :)</div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.account.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => dispatch(getUserData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
