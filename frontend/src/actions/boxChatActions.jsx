import axios from 'axios';
import {
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAIL,
  GET_CHAT_DETAILS_REQUEST,
  GET_CHAT_DETAILS_SUCCESS,
  GET_CHAT_DETAILS_FAIL,
  CREATE_OR_GET_CHAT_REQUEST,
  CREATE_OR_GET_CHAT_SUCCESS,
  CREATE_OR_GET_CHAT_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_ALL_USERS_IN_CHATS_REQUEST,
  GET_ALL_USERS_IN_CHATS_SUCCESS,
  GET_ALL_USERS_IN_CHATS_FAIL
} from '../constants/boxChatConstants';

// Get all chats for a user
export const getChats = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHATS_REQUEST });

    const { data } = await axios.get(`/api/v1/chats/${userId}`);

    dispatch({
      type: GET_CHATS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_CHATS_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

// Get chat details
export const getChatDetails = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/chat/${chatId}`);

    console.log("datam,,,,,,,,,,,,,,,,,",data);
    dispatch({
      type: GET_CHAT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

// Create or get chat
export const createOrGetChat = (participantId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_OR_GET_CHAT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/v1/chat/create', { participantId }, config);

    dispatch({
      type: CREATE_OR_GET_CHAT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_OR_GET_CHAT_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

// Send message
export const sendMessage = (chatId, content) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/v1/chat/message', { chatId, content }, config);

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};
export const getAllUsersInChats = (currentUserId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_USERS_IN_CHATS_REQUEST });

        const { token } = getState().auth;

        // Gửi request tới API kèm theo userId của người dùng hiện tại
        const { data } = await axios.get(`/api/v1/chats/users/${currentUserId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Sử dụng token để xác thực
            }
        });

        // Dispatch thành công với dữ liệu nhận được
        dispatch({
            type: GET_ALL_USERS_IN_CHATS_SUCCESS,
            payload: data.users
        });
    } catch (error) {
        // Dispatch lỗi nếu có
        dispatch({
            type: GET_ALL_USERS_IN_CHATS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};