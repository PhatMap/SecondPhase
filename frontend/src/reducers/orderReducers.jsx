import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CHECK_ORDER_REVIEW_REQUEST,
  CHECK_ORDER_REVIEW_SUCCESS,
  CHECK_ORDER_REVIEW_FAIL,
  CLEAR_ERRORS,
  MOMO_TRANSACTION_START,
  MOMO_TRANSACTION_SUCCESS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
        totalPaidAmount: action.payload.totalPaidAmount,
        totalPendingAmount: action.payload.totalPendingAmount,
      };

    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CHECK_ORDER_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case CHECK_ORDER_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        hasPurchased: action.payload.hasPurchased,
      };
    case CHECK_ORDER_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const momoReducer = (
  state = { orderId: [], url: [], orderStatus: [], paid: [] },
  action
) => {
  switch (action.type) {
    case MOMO_TRANSACTION_START:
      return {
        orderId: action.payload.orderId,
        orderStatus: action.payload.resultCode,
        url: action.payload.payUrl,
      };
    case MOMO_TRANSACTION_SUCCESS:
      return {
        paid: action.payload,
      };
    default:
      return state;
  }
};
