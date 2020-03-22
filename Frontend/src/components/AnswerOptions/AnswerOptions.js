import React from "react";
import { connect } from "react-redux";
import "./AnswerOptions.css";
import { submitAnswer } from "../../actions/carouselActions";

const AnswerOptions = ({ ansOptions, answered, correctAnswer, submitAnswer }) => {
  return (
    <div id="AnswerOptions" className={answered ? "answered" : ""}>
      {ansOptions.length !== 0
        ? ansOptions.map(option => (
            <button
              key={`${option.id}`}
              className={answered && option.answer === correctAnswer.answer ? "correct" : ""}
              onClick={() => submitAnswer(option.answer)}
            >
              {option.answer}
            </button>
          ))
        : ""}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    ansOptions: store.carousel.ansOptions,
    answered: store.carousel.answered,
    correctAnswer: store.carousel.correctAnswer
  };
};

export default connect(mapStateToProps, { submitAnswer })(AnswerOptions);
