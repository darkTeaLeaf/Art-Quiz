import React from "react";
import "./Account.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Account = () => {
  return (
    <div id="Account">
      Account page :)
    </div>
  );
};

export default withRouter(connect()(Account));
