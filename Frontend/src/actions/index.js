import { SUBMIT_ANSWER, SET_PAINTING, SET_ANSWERS, SET_CORRECT_ANSWER } from "../constants/actionTypes";
import axios from "axios";

export function submitAnswer(ans) {
  return {
    type: SUBMIT_ANSWER,
    payload: { answer: ans }
  }
}

export function switchPainting() {
  return function(dispatch) {
    return axios.get("http://127.0.0.1:8000/paintings/random/")
      .then(({ data }) => {
      dispatch(setPainting(data));
      dispatch(fetchCorrectAnswer(data.id));
      dispatch(fetchAnswers(data.id))
    });
  };
}

function fetchCorrectAnswer(id) {
  return function(dispatch) {
    return axios.get("http://127.0.0.1:8000/paintings/"+id+"/author/")
      .then(({ data }) => {
      dispatch(setCorrectAnswer(data.author));
    });
  }
}

function fetchAnswers(id) {
  return function(dispatch) {
    return axios.get("http://127.0.0.1:8000/paintings/"+id+"/variants/")
      .then(({ data }) => {
      dispatch(setAnswers(data.variants_author));
    });
  }
}

function setPainting(data) {
  return {
    type: SET_PAINTING,
    payload: {url: data.image, id: data.id}
  };
}

function setCorrectAnswer(author) {
  return {
    type: SET_CORRECT_ANSWER,
    payload: author
  };
}

function setAnswers(answers) {
  return {
    type: SET_ANSWERS,
    payload: answers
  };
}