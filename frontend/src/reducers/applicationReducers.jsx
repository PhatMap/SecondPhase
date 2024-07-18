import {
  CLEAR_ERRORS,
  NEW_APPLICATION_FAIL,
  NEW_APPLICATION_REQUEST,
  NEW_APPLICATION_RESET,
  NEW_APPLICATION_SUCCESS,
} from "../constants/applicationConstants";

export const newApplicationReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case NEW_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_APPLICATION_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case NEW_APPLICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case NEW_APPLICATION_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
