import React from "react";
import { connect } from "react-redux";
import "./AnswerOptions.css";
import Button from '../UI/Button';
import { submitAnswer } from "../../actions/carouselActions";

const AnswerOptions = ({ ansOptions, answered, correctAnswer, submitAnswer }) => {
  return (
    <div id="AnswerOptions" className={answered ? "answered" : ""}>
      {ansOptions.length !== 0
        ? ansOptions.map(option => (
            <Button
              key={`${option.id}`}
              pin
              answered={answered}
              correct={option.answer === correctAnswer.answer}
              onClick={() => submitAnswer(option.answer)}
            >
              {option.answer}
            </Button>
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
