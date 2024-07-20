import {
  CLEAR_ERRORS,
  GET_APPLICATIONS_FAIL,
  GET_APPLICATIONS_REQUEST,
  GET_APPLICATIONS_SUCCESS,
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

export const applicationsReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: action.payload.applications,
        total: action.payload.total,
        loading: false,
      };

    case GET_APPLICATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
