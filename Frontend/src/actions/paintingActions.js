import axios from "axios";
import { BACKEND_ADDRESS, SET_PAINTING, SET_PAINTING_FAIL } from "../constants";

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
  return async dispatch => Promise.all([dispatch(getRandomPainting())]);
};

const getRandomPainting = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${BACKEND_ADDRESS}/paintings/random/`);
      dispatch(setPainting(data.id, data.image));
    } catch (error) {
      dispatch(setPaintingFail(error));
    }
  };
};
