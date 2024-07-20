import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const categoryReducer = (state = { categories: [], totalCategories: 0, category: null, loading: false, success: false, error: null }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        totalCategories: action.payload.totalCategories,
      };

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload.category,
      };

    case CREATE_CATEGORY_SUCCESS:
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case GET_CATEGORIES_FAIL:
    case CREATE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_CATEGORY_RESET:
    case UPDATE_CATEGORY_RESET:
    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        success: false,
        category: null,
      };

    default:
      return state;
  }
};
