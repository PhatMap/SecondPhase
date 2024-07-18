import axios from "axios";
import {
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
