import { LoaderTypes } from "../action_types/loader_types";

const initialState = {
  loading: false,
};

export default function LoaderReducer(state = initialState, action = null) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case LoaderTypes.LOADER_START:
      return { loading: true };
    case LoaderTypes.LOADER_STOP:
      return { loading: false };
    default:
      return state;
  }
};
