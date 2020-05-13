import axios from "axios";
import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS_LIST,
  GET_PAINTINGS_LIST_SUCCESS,
  GET_PAINTINGS_LIST_FAILURE,
  UPDATE_PAINTING_SUCCESS,
  UPDATE_PAINTING_FAILURE,
  UPDATE_PAINTING,
} from "../constants";
import { toFormData } from "../helpers";
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
          image: process.env.REACT_APP_BACKEND_ADDRESS + image,
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

const updatePaintingSuccess = (data) => ({
  type: UPDATE_PAINTING_SUCCESS,
  data,
});

const updatePaintingFailure = (error) => ({
  type: UPDATE_PAINTING_FAILURE,
  error,
});

export const updatePainting = (data, id) => {
  const {image, ...rest } = data;

  const formattedData = {
    id,
    ...rest,
    ...(image.length
      ? {
          image: URL.createObjectURL(image[0]),
        }
      : {}),
  };

  const formData = toFormData({
    ...rest,
    ...(image.length ? { image: image[0] } : {}),
  });

  return (dispatch) => {
    dispatch({
      type: UPDATE_PAINTING,
    });

    try {
      axios.patch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(updatePaintingSuccess(formattedData));
    } catch (error) {
      dispatch(updatePaintingFailure("error"));
    }
  };
};
