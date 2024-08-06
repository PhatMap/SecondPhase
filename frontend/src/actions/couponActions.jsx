// couponActions.js
import axios from 'axios';
import {
    CREATE_COUPON_REQUEST,
    CREATE_COUPON_SUCCESS,
    CREATE_COUPON_FAIL,
    UPDATE_COUPON_REQUEST,
    UPDATE_COUPON_SUCCESS,
    UPDATE_COUPON_FAIL,
    DELETE_COUPON_REQUEST,
    DELETE_COUPON_SUCCESS,
    DELETE_COUPON_FAIL,
    GET_ALL_COUPONS_REQUEST,
    GET_ALL_COUPONS_SUCCESS,
    GET_ALL_COUPONS_FAIL,
    TOGGLE_STATUS_REQUEST,
    TOGGLE_STATUS_SUCCESS,
    TOGGLE_STATUS_FAIL,

    GET_ACTIVE_COUPONS_REQUEST,
    GET_ACTIVE_COUPONS_SUCCESS,
    GET_ACTIVE_COUPONS_FAIL,
} from '../constants/couponConstants';

// Create Coupon
export const createCoupon = (couponData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COUPON_REQUEST });

        const { data } = await axios.post('/api/v1/coupon/create', couponData);

        dispatch({
            type: CREATE_COUPON_SUCCESS,
            payload: data.coupon
        });

    } catch (error) {
        dispatch({
            type: CREATE_COUPON_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Coupon
export const updateCoupon = (id, couponData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COUPON_REQUEST });

        const { data } = await axios.put(`/api/v1/coupon/update/${id}`, couponData);

        dispatch({
            type: UPDATE_COUPON_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_COUPON_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COUPON_REQUEST });

        const { data } = await axios.delete(`/api/v1/coupon/delete/${id}`);

        dispatch({
            type: DELETE_COUPON_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_COUPON_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get All Coupons
 export const getAllCoupons =
    (currentPage = 1, keyword = "", resPerPage = 10) =>
    async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_COUPONS_REQUEST });
  
        const { data } = await axios.get(
          `/api/v1/admin/coupons?page=${currentPage}&keyword=${keyword}&resPerPage=${resPerPage}`
        );
  
        dispatch({
          type: GET_ALL_COUPONS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type:GET_ALL_COUPONS_FAIL,
          payload: error.response ? error.response.data.message : error.message,
        });
        console.log(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      }
    };


    export const toggleStatus = (id) => async (dispatch) => {
        try {
          dispatch({ type: TOGGLE_STATUS_REQUEST });
      
          const { data } = await axios.put(`/api/v1/coupon/toggle-status/${id}`);
          
          dispatch({
            type: TOGGLE_STATUS_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: TOGGLE_STATUS_FAIL,
            payload: error.response.data.message,
          });
        }
      };

      export const getActiveCoupons = () => async (dispatch) => {
        try {
            dispatch({ type: GET_ACTIVE_COUPONS_REQUEST });
    
            const { data } = await axios.get('/api/v1/coupons/active');
    
            dispatch({
                type: GET_ACTIVE_COUPONS_SUCCESS,
                payload: data
            });
    
        } catch (error) {
            dispatch({
                type: GET_ACTIVE_COUPONS_FAIL,
                payload: error.response.data.message
            });
        }
    };
      export const clearErrors = () => async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }