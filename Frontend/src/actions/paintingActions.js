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
  return (dispatch) => {
    dispatch({ type: GET_PAINTINGS_LIST });

    try {
      const data = [
        {
          author_name: "Van Gogh",
          gallery: "National gallery",
          id: 2,
          image: "/media/paintings/sunflowers.jpg",
          name: "Sunflowers",
          style_name: "Postimpressionism",
          year: 1888,
        },
        {
          author_name: "Irek Nazmiev",
          gallery: "Kazan Mosque",
          id: 3,
          image: "/media/paintings/the_scream.jpg",
          name: "The AAAAAA",
          style_name: "Tatar style",
          year: 1870,
        },
        {
          author_name: "Van Gogh",
          gallery: "National museum",
          id: 1,
          image:
            "/media/paintings/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg",
          name: "Starry Nigth",
          style_name: "Postimpressionism",
          year: 1889,
        },
        {
          author_name: "Mikhail Mazzarenko",
          gallery: "Italo-Russkoe",
          id: 4,
          image: "/media/paintings/smoke-digi-dee-gog.JPG",
          name: "The dog lock",
          style_name: "Gangnam",
          year: 2019,
        },
        {
          author_name: "Ariana Ferorozhnichenko",
          gallery: "Nizhne-Chelninskoy Uchilishe imeni Gabdylli Tukaya",
          id: 5,
          image:
            "/media/paintings/%D1%8F%D1%81%D1%82%D1%80%D0%B5%D0%B1%D1%91%D0%BD%D0%BE%D0%BA.jpg",
          name: "The eyes",
          style_name: "Postimpressionism",
          year: 1560,
        },
      ];

      getPaintingsListSuccess(data);
    } catch (error) {
      getPaintingsListFailure("error");
    }
  };
};
