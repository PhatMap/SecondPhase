import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  SAVE_SHIPPING_INFO,
  LOAD_CART_ITEMS_SUCCESS,
  LOAD_CART_ITEMS_FAIL,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  UPDATE_QUANTITY_SUCCESS,
  CHECK_CART_QUANTITIES_REQUEST,
  CHECK_CART_QUANTITIES_SUCCESS,
  CHECK_CART_QUANTITIES_FAIL,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        isAdded: action.payload.success,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        isRemoved: action.payload,
        error: null,
      };

    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
        error: null, 
      };

    case LOAD_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        error: null, 
      };

    case LOAD_CART_ITEMS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case EMPTY_CART_SUCCESS:
      return {
        ...state,
        success: action.payload.data.success,
        error: action.payload.data.error,
      };

    case EMPTY_CART_FAIL:
      return {
        ...state,
        success: action.payload.data.success,
        error: action.payload.data.error,
      };

    case UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        success: action.payload.data.success,
        error: action.payload.data.error,
      };

    case CHECK_CART_QUANTITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case CHECK_CART_QUANTITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case CHECK_CART_QUANTITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
