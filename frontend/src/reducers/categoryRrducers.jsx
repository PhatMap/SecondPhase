// categoryReducer.js
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
  } from '../constants/categoryConstants';
  
  export const categoriesReducer = (state = { loading: false, categories: [] }, action) => {
    switch (action.type) {
      case GET_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_CATEGORIES_SUCCESS:
        return {
          loading: false,
          categories: action.payload,
        };
      case GET_CATEGORIES_FAIL:
        return {
          loading: false,
          error: action.payload,
          categories: [], // or maintain current state
        };
      default:
        return state;
    }
  };
  
  export const categoryReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case CREATE_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          category: action.payload.category,
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          category: action.payload.category,
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
      case CREATE_CATEGORY_FAIL:
      case UPDATE_CATEGORY_FAIL:
      case DELETE_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CATEGORY_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      default:
        return state;
    }
  };
  