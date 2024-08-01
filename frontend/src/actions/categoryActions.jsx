import axios from "axios";
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_ALLCATEGORIES_REQUEST,
  GET_ALLCATEGORIES_SUCCESS,
  GET_ALLCATEGORIES_FAIL,
} from "../constants/categoryConstants";

export const getCategories =
  (currentPage = 1, keyword = "", resPerPage = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORIES_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/categories?page=${currentPage}&keyword=${keyword}&resPerPage=${resPerPage}`
      );

      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CATEGORIES_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
      console.log(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };
// Create Category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/category/new",
      categoryData,
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Category
export const updateCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/category/update/${categoryData._id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/category/delete/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/category/${id}`);
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
export const getCategoryAll = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLCATEGORIES_REQUEST });

    const { data } = await axios.get("/api/v1/CategoryAll");

    dispatch({
      type: GET_ALLCATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALLCATEGORIES_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
