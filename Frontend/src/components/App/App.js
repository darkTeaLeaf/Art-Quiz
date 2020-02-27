import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Carousel from "../Carousel";
import AnswerOptions from "../AnswerOptions";
import { switchPainting } from "../../actions";

const App = ({ winsCounter, switchPainting }) => {
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

          <button className="arrow-next" onClick={() => switchPainting()}>
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
  winsCounter: store.carousel.winsCounter
});

const mapDispatchToProps = dispatch => ({
  switchPainting: () => dispatch(switchPainting())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
