import axios from "axios";
import { SET_ANSWERS, SET_CORRECT_ANSWER, SUBMIT_ANSWER } from "../constants";

const setAnswers = answers => ({
  type: SET_ANSWERS,
  payload: answers
});

const setCorrectAnswer = correctAnswer => ({
  type: SET_CORRECT_ANSWER,
  payload: correctAnswer
});

export const submitAnswer = answer => ({
  type: SUBMIT_ANSWER,
  payload: answer
})

export const getAnswers = () => {
  return async (dispatch, getState) => {
    const { id } = getState().painting;
    const {
      data: { variants_author: answers }
    } = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/variants_author/`
    );
    const {
      data: { author: correctAnswer }
    } = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/author/`
    );

    dispatch(
      setCorrectAnswer({ id: correctAnswer.id, answer: correctAnswer.name })
    );
    dispatch(
      setAnswers([
        ...answers.map(ans => ({ id: ans.id, answer: ans.name })),
        { id: correctAnswer.id, answer: correctAnswer.name }
      ])
    );
  };
};
