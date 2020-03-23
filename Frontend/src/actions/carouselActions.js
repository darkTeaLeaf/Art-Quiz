import axios from "axios";
import {
  SET_ANSWERS,
  SET_CORRECT_ANSWER,
  SUBMIT_CORRECT_ANSWER,
  SUBMIT_INCORRECT_ANSWER,
  SET_ANSWERED,
  SET_WINS_COUNTER
} from "../constants";

const setAnswers = answers => ({
  type: SET_ANSWERS,
  payload: answers
});

const setCorrectAnswer = correctAnswer => ({
  type: SET_CORRECT_ANSWER,
  payload: correctAnswer
});

export const setWinsCounter = winsCounter => ({
  type: SET_WINS_COUNTER,
  payload: winsCounter
});

const submitCorrectAnswer = () => ({
  type: SUBMIT_CORRECT_ANSWER,
  payload: {}
});

const submitIncorrectAnswer = () => ({
  type: SUBMIT_INCORRECT_ANSWER,
  payload: {}
});

export const submitAnswer = answer => {
  return (dispatch, getState) => {
    const { answered, correctAnswer } = getState().carousel;
    console.log(answer);
    console.log(answered);
    console.log(correctAnswer);
    if (!answered) {
      if (answer === correctAnswer.answer) {
        alert("CORRECT!");
        dispatch(submitCorrectAnswer());
      } else {
        alert("WRONG!");
        dispatch(submitIncorrectAnswer());
      }
    }
  };
};

export const setAnswered = answered => ({
  type: SET_ANSWERED,
  payload: answered
});

export const getAnswers = () => {
  return async (dispatch, getState) => {
    const { id } = getState().painting;
    const { data: answers } = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/variants/?type=author`
    );
    const {
      data: { author: correctAnswer }
    } = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/?fields=author`
    );

    dispatch(
      setCorrectAnswer({ id: correctAnswer.id, answer: correctAnswer.name })
    );
    dispatch(
      setAnswers([
        ...answers.map((ans, i) => ({ id: "0" + i, answer: ans })), // TO BE REMOVED
        { id: correctAnswer.id, answer: correctAnswer.name }
      ])
    );
  };
};
