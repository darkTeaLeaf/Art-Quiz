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
    const { id, isAuthenticated } = getState().account;
    const { answered, correctAnswer } = getState().carousel;

    if (!answered) {
      if (answer === correctAnswer.answer) {
        alert("CORRECT!");
        dispatch(submitCorrectAnswer());

        if (isAuthenticated) {
          axios.patch(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${id}/statistic/victory/`,
            {},
            {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`
              }
            }
          );
        }
      } else {
        alert("WRONG!");
        dispatch(submitIncorrectAnswer());

        if (isAuthenticated) {
          axios.patch(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${id}/statistic/fail/`,
            {},
            {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`
              }
            }
          );
        }
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
      data: { author_name }
    } = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/?fields=author_name`
    );

    dispatch(
      setCorrectAnswer({ id: 99, answer: author_name })
    );
    dispatch(
      setAnswers([
        ...answers.map((ans, i) => ({ id: "0" + i, answer: ans })), // TO BE REMOVED
        { id: "03", answer: author_name }
      ])
    );
  };
};
