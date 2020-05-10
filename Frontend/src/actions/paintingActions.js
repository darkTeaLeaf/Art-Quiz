import axios from "axios";
import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS_LIST_SUCCESS,
  GET_PAINTINGS_LIST_FAILURE,
  GET_PAINTINGS_LIST,
} from "../constants";
import { getAnswers, setAnswered } from "./carouselActions";

const setPainting = (id, url) => ({
  type: SET_PAINTING,
  payload: { id, url },
});

const setPaintingFail = (error) => ({
  type: SET_PAINTING_FAIL,
  payload: error.message,
  error: true,
});

export const switchPainting = () => {
  return async (dispatch) => {
    await dispatch(getRandomPainting());
    await dispatch(getAnswers());
    dispatch(setAnswered(false));
  };
};

const getRandomPainting = () => {
  return async (dispatch) => {
    try {
      const {
        data: { id, image },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/random/`
      );
      dispatch(setPainting(id, image));
    } catch (error) {
      dispatch(setPaintingFail(error));
    }
  };
};

const getPaintingsListSuccess = (data) => ({
  type: GET_PAINTINGS_LIST_SUCCESS,
  data,
});

const getPaintingsListFailure = (error) => ({
  type: GET_PAINTINGS_LIST_FAILURE,
  error,
});

export const getPaintingsList = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PAINTINGS_LIST });

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/`
      );

      const formattedData = data.map(
        ({ id, author_name, gallery, image, name, style_name, year }) => ({
          id,
          gallery,
          year,
          name,
          image,
          author: author_name,
          style: style_name,
        })
      );

      dispatch(getPaintingsListSuccess(formattedData));
    } catch (error) {
      dispatch(getPaintingsListFailure("error"));
    }
  };
};
