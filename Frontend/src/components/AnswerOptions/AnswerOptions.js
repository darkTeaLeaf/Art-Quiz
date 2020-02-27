import React from "react";
import { connect } from "react-redux";
import "./AnswerOptions.css";
import { submitAnswer } from "../../actions";

const AnswerOptions = ({ ansOptions, answered, realAuthor, submitAnswer }) => {
  return (
    <div id="AnswerOptions" className={answered ? "answered" : ""}>
      {ansOptions.length !== 0
        ? ansOptions.map(author => (
            <button
              key={author}
              className={answered && author === realAuthor ? "correct" : ""}
              onClick={() => submitAnswer(author)}
            >
              {author}
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
    realAuthor: store.painting.author
  };
};

export default connect(mapStateToProps, { submitAnswer })(AnswerOptions);
