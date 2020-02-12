import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Carousel from "../Carousel";
import AnswerOptions from "../AnswerOptions"
import { switchPainting } from "../../actions";

function App({winsCounter, switchPainting}) {
  return (
    <div id="App">
      <Carousel />
      <button onClick={() => switchPainting()}>></button>
      <AnswerOptions />
      <span>{ winsCounter }</span>
    </div>
  );
}

const mapStateToProps = state => {
  return { winsCounter: state.winsCounter };
};

export default connect(mapStateToProps, { switchPainting })(App);