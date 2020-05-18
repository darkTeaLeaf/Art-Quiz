import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import { getUserData } from "../../actions/accountActions";

import PaintingsManagementPanel from "../../components/PaintingsManagementPanel";
import PaintingSuggestPage from "../../components/PaintingSuggestPage";
import Avatar from "../../components/UI/Avatar";
import Button from "../../components/UI/Button";
import WelcomeMsg from "../../components/UI/Title";
import Subtitle from "../../components/UI/Subtitle";
import Tooltip from "../../components/UI/Tooltip";
import Modal from "../../components/UI/Modal";

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > * {
    padding: 0 60px;
  }
`;

const ProfileInfo = styled.aside`
  position: relative;
  margin-top: 100px;
  display: flex;
  flex-direction: column;

  ${Avatar} {
    margin-bottom: 55px;
  }
`;

const CrownWrapper = styled(Tooltip)`
  width: 60px;

  position: absolute;
  top: -40px;
  right: calc(50% - 30px);
  z-index: 99;
`;

const Crown = styled.img`
  width: 100%;
`;

const Name = styled.span`
  font-family: "Judson", serif;
  font-weight: 700;
  font-size: 45px;
  line-height: 50px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 35px;

  display: flex;
  flex-direction: column;

  ${Button} {
    margin-bottom: 22px;
  }
`;

const UserData = styled.main`
  display: flex;
  flex-direction: column;
  width: 800px;

  > *:not(:first-child) {
    margin-bottom: 115px;
  }
`;

const WelcomeMsgWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 75px;

  span {
    font-weight: 700;
  }
`;

const Achievements = styled.section``;

const AchievementsWrapper = styled.div`
  display: flex;
`;

const AchievementWrapper = styled(Tooltip)`
  margin-right: 30px;
  width: 150px;
`;

const Achievement = styled.img`
  width: 100%;
  opacity: ${(props) => (props.done ? 1 : 0.4)};
`;

const Statistics = styled.section``;

const StatisticsWrapper = styled.div`
  font-family: Raleway;
  font-size: 25px;
  line-height: 35px;

  display: flex;
  flex-wrap: wrap;

  > * {
    width: 50%;
  }
`;

const StatTitle = styled.div`
  font-weight: normal;
`;

const StatValue = styled.div`
  font-weight: bold;
  padding-left: 15px;
`;

const Account = ({ isAuthenticated, userData, getUserData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated, getUserData]);

  const {
    username,
    firstName,
    lastName,
    avatar,
    isModerator,
    achievements,
    statistic: { winRate, winsTotal, gamesTotal },
  } = userData;

  const [paintManagModalActive, setPaintManagModalActive] = useState(false);

  const [paintSuggestModalActive, setPaintSuggestModalActive] = useState(false);

  const togglePaintManagModal = () => {
    setPaintManagModalActive(!paintManagModalActive);
  };

  const togglePaintSuggestModal = () => {
    setPaintSuggestModalActive(!paintSuggestModalActive);
  };

  return isAuthenticated ? (
    <AccountWrapper>
      <ProfileInfo>
        {isModerator && (
          <CrownWrapper title="You are a moderator!">
            <Crown
              src={`${process.env.PUBLIC_URL}/img/crown.png`}
              alt="crown"
            />
          </CrownWrapper>
        )}

        <Avatar
          src={avatar}
          width="315px"
          height="315px"
          rounded
          borderWidth="15px"
        />

        <Name>
          {firstName}
          <br />
          {lastName}
        </Name>

        <ButtonsWrapper>
          {/* <Button>Edit account data</Button> */}
          {isModerator ? (
            <Button link onClick={togglePaintManagModal}>
              Manage paintings
            </Button>
          ) : (
            <Button link onClick={togglePaintSuggestModal}>
              Suggest painting
            </Button>
          )}
        </ButtonsWrapper>
      </ProfileInfo>

      <UserData>
        <WelcomeMsgWrapper>
          <WelcomeMsg>
            Welcome, <span>{username}!</span>
          </WelcomeMsg>
        </WelcomeMsgWrapper>

        <Achievements>
          <Subtitle>Your achievements</Subtitle>

          <AchievementsWrapper>
            {achievements.map((a) => (
              <AchievementWrapper
                key={"ach-wrapper" + a.id}
                title={`${a.name}\nYou've got ${a.progress} out of ${a.max_score}`}
              >
                <Achievement
                  key={"achievement" + a.id}
                  src={a.image}
                  alt="achievement"
                  done={a.progress >= a.max_score}
                />
              </AchievementWrapper>
            ))}
          </AchievementsWrapper>
        </Achievements>

        <Statistics>
          <Subtitle>Your statistics</Subtitle>

          <StatisticsWrapper>
            <StatTitle>Win rate:</StatTitle>
            <StatValue>{winRate}%</StatValue>

            <StatTitle>Wins total:</StatTitle>
            <StatValue>{winsTotal}</StatValue>

            <StatTitle>Games total:</StatTitle>
            <StatValue>{gamesTotal}</StatValue>
          </StatisticsWrapper>
        </Statistics>
      </UserData>

      <Modal active={paintManagModalActive} onClose={togglePaintManagModal}>
        <PaintingsManagementPanel />
      </Modal>

      <Modal active={paintSuggestModalActive} onClose={togglePaintSuggestModal}>
        <PaintingSuggestPage />
      </Modal>
    </AccountWrapper>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (store) => ({
  userData: store.account.userData,
  isAuthenticated: store.account.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(getUserData()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
