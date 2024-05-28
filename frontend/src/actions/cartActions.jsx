import axios from "axios";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  SAVE_SHIPPING_INFO,
  LOAD_CART_ITEMS_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
  UPDATE_QUANTITY_SUCCESS,
} from "../constants/cartConstants";

export const getUserCart = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/v1/cart/me`);
    const { cartItems } = response.data;

    dispatch({
      type: LOAD_CART_ITEMS_SUCCESS,
      payload: cartItems,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemToCart = (item) => async (dispatch) => {
  try {
    const newData = await axios.post("/api/v1/cart", {
      cartItems: [item],
    });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.message,
    });
  }
};

export const removeItemFromCart = (id, size) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(`/api/v1/cart/${id}/${size}`);

    dispatch({
      type: REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
