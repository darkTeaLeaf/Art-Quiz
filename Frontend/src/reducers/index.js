import { combineReducers } from "redux";
import { paintingReducer } from "./painting";
import { carouselReducer } from "./carousel";
import { accountReducer } from "./account";

export const rootReducer = combineReducers({
  painting: paintingReducer,
  carousel: carouselReducer,
  account: accountReducer
});
