import React from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const Account = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <div id="Account">Account page :)</div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.account.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Account));
