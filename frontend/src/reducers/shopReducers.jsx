import {
  CLEAR_ERRORS,
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_RESET,
  UPDATE_SHOP_SUCCESS,
} from "../constants/shopConstants";

export const shopReducer = (state = {}, action) => {
  switch (action.type) {
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
