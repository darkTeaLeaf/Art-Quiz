import React, { useEffect } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getUserData } from "../../actions/accountActions";
import Avatar from "../../components/UI/Avatar";

const Account = ({ isAuthenticated, userData, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  const { username, firstName, lastName, avatar } = userData;

  return isAuthenticated ? (
    <div id="Account">
      <aside className="profile-info">
        <Avatar src={avatar} width="315px" height="315px" rounded borderWidth="15px" />
        <span className="first-name">{firstName}</span>
        <span className="last-name">{lastName}</span>
      </aside>

      <main className="user-data">
        <section className="welcome-msg">Welcome, {username}!</section>
        <section className="achievements">Achievements</section>
        <section className="stats">Statistics</section>
      </main>
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
