import axios from "axios";
import {
  SET_PAINTING,
  SET_PAINTING_FAIL,
  GET_PAINTINGS,
  GET_PAINTINGS_SUCCESS,
  GET_PAINTINGS_FAILURE,
  GET_AUTHORS,
  GET_AUTHORS_SUCCESS,
  GET_AUTHORS_FAILURE,
  GET_STYLES,
  GET_STYLES_SUCCESS,
  GET_STYLES_FAILURE,
  UPDATE_PAINTING,
  UPDATE_PAINTING_SUCCESS,
  UPDATE_PAINTING_FAILURE,
  ADD_PAINTING,
  ADD_PAINTING_SUCCESS,
  ADD_PAINTING_FAILURE,
  DELETE_PAINTING,
  DELETE_PAINTING_SUCCESS,
  DELETE_PAINTING_FAILURE,
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

const getPaintingsSuccess = (data) => ({
  type: GET_PAINTINGS_SUCCESS,
  data,
});

const getPaintingsFailure = (error) => ({
  type: GET_PAINTINGS_FAILURE,
  error,
});

export const getPaintings = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PAINTINGS });

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

      dispatch(getPaintingsSuccess(formattedData));
    } catch (error) {
      dispatch(getPaintingsFailure("error"));
    }
  };
};

const getAuthorsSuccess = (data) => ({
  type: GET_AUTHORS_SUCCESS,
  data,
});

const getAuthorsFailure = (error) => ({
  type: GET_AUTHORS_FAILURE,
  error,
});

export const getAuthors = () => {
  return async (dispatch) => {
    dispatch({ type: GET_AUTHORS });

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/authors/`
      );

      dispatch(getAuthorsSuccess(data));
    } catch (error) {
      dispatch(getAuthorsFailure("error"));
    }
  };
};

const getStylesSuccess = (data) => ({
  type: GET_STYLES_SUCCESS,
  data,
});

const getStylesFailure = (error) => ({
  type: GET_STYLES_FAILURE,
  error,
});

export const getStyles = () => {
  return async (dispatch) => {
    dispatch({ type: GET_STYLES });

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/styles/`
      );

      dispatch(getStylesSuccess(data));
    } catch (error) {
      dispatch(getStylesFailure("error"));
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
  return (dispatch, getState) => {
    const { image, ...rest } = data;
    const { authors, styles } = getState().painting;

    const formattedData = {
      id,
      ...rest,
      ...(image.length
        ? {
            image: URL.createObjectURL(image[0]),
          }
        : {}),
      author: authors.data.filter(
        (author) => author.id.toString() === data.author
      )[0].name,
      style: styles.data.filter(
        (style) => style.id.toString() === data.style
      )[0].name,
    };

    const formData = toFormData({
      ...rest,
      ...(image.length ? { image: image[0] } : {}),
    });

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

const addPaintingSuccess = (data) => ({
  type: ADD_PAINTING_SUCCESS,
  data,
});

const addPaintingFailure = (error) => ({
  type: ADD_PAINTING_FAILURE,
  error,
});

export const addPainting = (pData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PAINTING });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/`,
        toFormData({ ...pData, image: pData.image[0] }),
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(
        addPaintingSuccess({
          ...data,
          author: data.author_name,
          style: data.style_name,
          image: process.env.REACT_APP_BACKEND_ADDRESS + data.image,
        })
      );
    } catch (error) {
      dispatch(addPaintingFailure("error"));
    }
  };
};

const deletePaintingSuccess = (id) => ({
  type: DELETE_PAINTING_SUCCESS,
  id,
});

const deletePaintingFailure = (error) => ({
  type: DELETE_PAINTING_FAILURE,
  error,
});

export const deletePainting = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_PAINTING });

    try {
      axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/${id}/`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
          },
        }
      );

      dispatch(deletePaintingSuccess(id));
    } catch (error) {
      dispatch(deletePaintingFailure("error"));
    }
  };
};
