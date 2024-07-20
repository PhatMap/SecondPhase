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
} from '../constants/categoryConstants';

const initialState = {
  loading: false,
  categories: [],
  totalCategories: 0,
  category: null,
  success: false,
  error: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        categories: [],
      };
    case CREATE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
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
