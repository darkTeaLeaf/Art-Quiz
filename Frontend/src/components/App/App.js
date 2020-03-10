import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import Carousel from "../Carousel";
import AnswerOptions from "../AnswerOptions";
import { switchPainting } from "../../actions/paintingActions";
import { setWinsCounter } from "../../actions/carouselActions";

const App = ({ winsCounter, answered, switchPainting, setWinsCounter }) => {
  useEffect(() => {
    switchPainting();
  }, []);

  const [skipAccepted, setSkipAccepted] = useState(false);

  const nextPainting = () => {
    if (!answered && !skipAccepted && winsCounter > 0) {
      alert(
        "Are you sure?\nSkipping the painting will cause to your winning streak discard!"
      );
      setSkipAccepted(true);
    } else {
      if (!answered) {
        setWinsCounter(0);
      }
      switchPainting();
      setSkipAccepted(false);
    }
  };

  return (
    <div id="App">
      <section>
        <div className="container">
          <div className="wins-counter">
            <img src={process.env.PUBLIC_URL + "/img/flag.svg"} alt="flag" />
            {winsCounter}
          </div>

          <div className="quiz">
            <Carousel />
            <AnswerOptions />
          </div>

          <button className="arrow-next" onClick={nextPainting}>
            <img
              src={process.env.PUBLIC_URL + "/img/arrow-next.svg"}
              alt="arrow-next"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = store => ({
  winsCounter: store.carousel.winsCounter,
  answered: store.carousel.answered
});

const mapDispatchToProps = dispatch => ({
  switchPainting: () => dispatch(switchPainting()),
  setWinsCounter: winsCounter => dispatch(setWinsCounter(winsCounter))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
