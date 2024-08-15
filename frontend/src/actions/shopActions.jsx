import axios from "axios";
import {
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_SUCCESS,
} from "../constants/shopConstants";

export const updateShop = (newData, field) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/v1/shop/me`, { newData, field }, config);

    dispatch({
      type: UPDATE_SHOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};
