import { data } from "browserslist";
import { ApiTypes } from "../action_types/api_types";

const initialState = {
    userList: [],

};

export default function FetchReducer(state = initialState, action = null) {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case ApiTypes.API_RESPONSE: {
            console.log("image", data)
            return {
                ...state,
                userList: action.data

            };

        }
        case ApiTypes.POST_RESPONSE: {
            console.log("reducer", action.data);
            state.userList.push(action.data)
            return {
                ...state,
            };
        }
        case ApiTypes.DELETE_RESPONSE: {
            return {
                ...state, userList: action.data
            };
        }
        case ApiTypes.EDIT_RESPONSE: {

            console.log("reducer", action.data)
            return {
                ...state, userList: action.data
            };

        }
        default:
            return state;
    }
}
