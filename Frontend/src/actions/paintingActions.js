import axios from "axios";
import { BACKEND_ADDRESS, SET_PAINTING, SET_PAINTING_FAIL } from "../constants";
import { getAnswers } from "./carouselActions";

const setPainting = (id, url) => ({
  type: SET_PAINTING,
  payload: { id, url }
});

const setPaintingFail = error => ({
  type: SET_PAINTING_FAIL,
  payload: error.message,
  error: true
});

export const switchPainting = () => {
  return async dispatch => {
    await dispatch(getRandomPainting());
    await dispatch(getAnswers());
  };
};

const getRandomPainting = () => {
  return async dispatch => {
    try {
      const { data: {id, image} } = await axios.get(`${BACKEND_ADDRESS}/paintings/random/`);
      dispatch(setPainting(id, image));
    } catch (error) {
      dispatch(setPaintingFail(error));
    }
  };
};
