import {
  CLEAR_ERRORS,
  GET_SHOP_FAIL,
  GET_SHOP_SUCCESS,
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_RESET,
  UPDATE_SHOP_SUCCESS,
} from "../constants/shopConstants";

export const shopReducer = (state = { shop: {}, shopData: {} }, action) => {
  switch (action.type) {
    case GET_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload.shop,
        shopData: action.payload.shopData,
      };

    case GET_SHOP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };

    case UPDATE_SHOP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SHOP_RESET:
      return {
        ...state,
        isUpdated: false,
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
