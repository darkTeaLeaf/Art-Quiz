import { combineReducers } from "redux";
import { paintingReducer } from "./painting";
import { carouselReducer } from "./carousel";

export const rootReducer = combineReducers({
  painting: paintingReducer,
  carousel: carouselReducer
});
