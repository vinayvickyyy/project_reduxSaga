import { put, takeEvery } from "redux-saga/effects";
import { LoaderTypes } from "../action_types/loader_types";
import { ApiTypes } from "../action_types/api_types";
import axios from "axios";
//for fetching 
function* fetch() {
    yield put({ type: LoaderTypes.LOADER_START });
    try {
        //   const url = `${process.env.REACT_APP_API_URL}/${URI.LOGIN}`;
        //   const res = yield axios.post(url, payload);
        // const url = "https://reqres.in/api/users";
        let res = yield axios.get("https://reqres.in/api/users");
        console.log(res);
        yield put({ type: ApiTypes.API_RESPONSE, data: res.data.data });
        // callback(false);
    } catch (e) {
        // callback(true);
    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}

//for posting data

function* uploading({ payload, callback }) {
    yield put({ type: LoaderTypes.LOADER_START });
    try {

        console.log("payload", payload)
        yield put({ type: ApiTypes.POST_RESPONSE, data: payload });
        callback()
        console.log("payload", payload)
    } catch (e) {
        // callback(true);
    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}


function* deleting({ payload, callback }) {
    yield put({ type: LoaderTypes.LOADER_START });
    try {

        yield put({ type: ApiTypes.API_RESPONSE, data: payload });
        callback()
    } catch (e) {
        // callback(true);
    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}

function* editing({ payload, callback }) {
    yield put({ type: LoaderTypes.LOADER_START });
    try {

        yield put({ type: ApiTypes.EDIT_RESPONSE, data: payload });
        callback()
    } catch (e) {
        // callback(true);
    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}


export default function* AuthSaga() {
    yield takeEvery(ApiTypes.API_REQUEST, fetch);
    yield takeEvery(ApiTypes.POST_REQUEST, uploading);
    yield takeEvery(ApiTypes.DELETE_REQUEST, deleting);
    yield takeEvery(ApiTypes.EDIT_REQUEST, editing); 
}
