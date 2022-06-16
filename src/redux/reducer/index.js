import { combineReducers } from "redux";

import LoaderReducer from "./loader_reducer";
import FetchReducer from "./api_reducer";
const RootReducer = combineReducers({
  Loader: LoaderReducer,
  FetchData: FetchReducer,

});

export default RootReducer;
