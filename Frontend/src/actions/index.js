import {
  SUBMIT_ANSWER,
  SET_PAINTING,
  SET_ANSWERS,
  SET_CORRECT_ANSWER,
  BACKEND_ADDRESS
} from "../constants";
import axios from "axios";

export function submitAnswer(ans) {
  return {
    type: SUBMIT_ANSWER,
    payload: { answer: ans }
  };
}

export function switchPainting() {
  return async function(dispatch) {
    const { data } = await axios.get(`${BACKEND_ADDRESS}/paintings/random/`);
    dispatch(setPainting(data));
    dispatch(fetchAnswers(data.id));
    // dispatch(fetchCorrectAnswer(data.id));
  };
}

function fetchAnswers(id) {
  return async function(dispatch) {
    const authors = await axios.get(
      `${BACKEND_ADDRESS}/paintings/${id}/variants_author/`
    );
    const author = await axios.get(
      `${BACKEND_ADDRESS}/paintings/${id}/author/`
    );
    let i = Math.floor(
      Math.random() * Math.floor(authors.data.variants_author.length + 1)
    );

    dispatch(
      setAnswers(
        authors.data.variants_author
          .slice(0, i)
          .concat(author.data.author, authors.data.variants_author.slice(i)),
        author.data.author
      )
    );
  };
}

// function fetchCorrectAnswer(id) {
//   return async function(dispatch) {
//     const { data } = await axios.get(`${BACKEND_ADDRESS}/paintings/${id}/author/`);
//     dispatch(setCorrectAnswer(data.author));
//   }
// }

function setPainting(data) {
  return {
    type: SET_PAINTING,
    payload: { url: data.image, id: data.id }
  };
}

// function setCorrectAnswer(author) {
//   return {
//     type: SET_CORRECT_ANSWER,
//     payload: {author: author.name}
//   };
// }

export function setAnswers(answers, author) {
  return {
    type: SET_ANSWERS,
    payload: { answers: answers.map(a => a.name), author: author }
  };
}
