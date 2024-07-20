import axios from "axios";
import {
  GET_APPLICATIONS_FAIL,
  GET_APPLICATIONS_REQUEST,
  GET_APPLICATIONS_SUCCESS,
  NEW_APPLICATION_FAIL,
  NEW_APPLICATION_REQUEST,
  NEW_APPLICATION_SUCCESS,
} from "../constants/applicationConstants";

export const newApplication = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_APPLICATION_REQUEST,
    });

    const { data } = await axios.post("/api/v1/customer/application/new", {
      formData,
    });

    dispatch({
      type: NEW_APPLICATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_APPLICATION_FAIL,
      payload: error.message,
    });
  }
};

export const getApplications =
  (currentPage = 1, resPerPage = 5, keyword = "", status = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_APPLICATIONS_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/admin/applications?keyword=${keyword}&status=${status}&page=${currentPage}&limit=${resPerPage}`
      );

      dispatch({
        type: GET_APPLICATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_APPLICATIONS_FAIL,
        payload: error.message,
      });
    }
  };
