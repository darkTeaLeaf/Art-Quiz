import React, { useEffect } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getUserData } from "../../actions/accountActions";
import Avatar from "../../components/UI/Avatar";
import Button from "../../components/UI/Button";

const Account = ({ isAuthenticated, userData, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, []);

  const {
    username,
    firstName,
    lastName,
    avatar,
    isModerator,
    achievements,
    statistic: { winRate, winsTotal, gamesTotal }
  } = userData;

  return isAuthenticated ? (
    <div id="Account">
      <aside className="profile-info">
        {isModerator && (
          <div className="crown" title="You are a moderator!">
            <img
              src={`${process.env.PUBLIC_URL}/img/crown.png`}
              alt="crown"
            />
          </div>
        )}

        <Avatar
          className="user-pic"
          src={avatar}
          width="315px"
          height="315px"
          rounded
          borderWidth="15px"
        />

        <span className="first-name">{firstName}</span>
        <span className="last-name">{lastName}</span>

        <Button>Edit account data</Button>
      </aside>

      <main className="user-data">
        <div className="welcome-msg-wrapper">
          <h1 className="welcome-msg">
            Welcome, <span>{username}!</span>
          </h1>
        </div>

        <section className="achievements">
          <h2>Your achievements</h2>
          <div className="wrapper">
            {achievements.map(a => (
              <div
                key={"ach-wrapper" + a.id}
                title={`${a.name}\nYou've got ${a.progress} out of ${a.max_score}`}
              >
                <img
                  key={"achievement" + a.id}
                  src={a.image}
                  alt="achievement"
                  className={
                    "achievement" + (a.progress >= a.max_score ? " done" : "")
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="statistics">
          <h2>Your statistics</h2>
          <div className="wrapper">
            <div className="title">Win rate:</div>
            <div className="stat">{winRate}%</div>

            <div className="title">Wins total:</div>
            <div className="stat">{winsTotal}</div>

            <div className="title">Games total:</div>
            <div className="stat">{gamesTotal}</div>
          </div>
        </section>
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
