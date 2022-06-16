import { all } from "redux-saga/effects";

import AuthSaga from "./api_saga";

export default function*  RootSaga() {
  yield all([ AuthSaga()]);
}
