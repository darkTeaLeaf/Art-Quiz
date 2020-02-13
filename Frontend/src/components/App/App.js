import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Carousel from "../Carousel";
import AnswerOptions from "../AnswerOptions"
import { switchPainting } from "../../actions";

function App({winsCounter, switchPainting}) {
  return (
    <div id="App">
      <section>
        <div className="container">
          <div className="wins-counter">
            <img src={process.env.PUBLIC_URL + "/img/flag.svg"} alt="flag"/>
            { winsCounter }
          </div>

          <div className="quiz">
            <div className="rope"></div>
            <Carousel />
            <AnswerOptions />
          </div>

          <button className="arrow-next" onClick={() => switchPainting()}>
            <img src={process.env.PUBLIC_URL + "/img/arrow-next.svg"} alt="arrow-next"/>
          </button>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return { winsCounter: state.winsCounter };
};

export default connect(mapStateToProps, { switchPainting })(App);