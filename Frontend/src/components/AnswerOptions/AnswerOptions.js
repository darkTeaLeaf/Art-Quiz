import React from "react";
import { connect } from "react-redux";
import "./AnswerOptions.css";
import { submitAnswer } from "../../actions";

const Carousel = ({ ansOptions, name, submitAnswer }) => {
  return (
    <div id="AnswerOptions">
      {ansOptions.length !== 0
        ? ansOptions.concat(name).map(ans => (
            <button key={ans} onClick={() => submitAnswer(ans)}>{ans}</button>
          ))
        : ""}
    </div>
  );
};

const mapStateToProps = state => {
  return { ansOptions: state.ansOptions, name: state.painting.name };
};

export default connect(mapStateToProps, { submitAnswer })(Carousel);
