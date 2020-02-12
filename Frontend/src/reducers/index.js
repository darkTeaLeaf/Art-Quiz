import { SWITCH_PAINTING, SUBMIT_ANSWER } from "../constants/actionTypes";

const initialState = {
  painting: {
    id: 0,
    name: "Starry night",
    author: "Van Gogh",
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  newPainting: {
    id: 1,
    name: "Mona Lisa",
    author: "Leonardo da Vinci",
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
  ansOptions: ["Kek", "Lol", "Meow"],
  winsCounter: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_PAINTING: {
      return {
        ...state,
        painting: { ...state.newPainting }
      };
    }
    case SUBMIT_ANSWER: {
      const { answer } = action.payload;
      if (answer === state.painting.name) {
        alert("CORRECT!");
        return {
          ...state,
          painting: { ...state.newPainting },
          winsCounter: state.winsCounter + 1
        };
      }
      else {
        alert("WRONG!");
        return {
          ...state,
          painting: { ...state.newPainting },
          winsCounter: 0
        };
      }
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;
