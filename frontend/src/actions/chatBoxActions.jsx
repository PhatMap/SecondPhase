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
  GET_ALL_USERS_IN_CHATS_FAIL,
  ADD_MESSAGE_ICON_REQUEST,
  ADD_MESSAGE_ICON_SUCCESS,
  ADD_MESSAGE_ICON_FAIL,
  UPDATE_MESSAGE_ICON_REQUEST,
  UPDATE_MESSAGE_ICON_SUCCESS,
  UPDATE_MESSAGE_ICON_FAIL,
  REMOVE_MESSAGE_ICON_REQUEST,
  REMOVE_MESSAGE_ICON_SUCCESS,
  REMOVE_MESSAGE_ICON_FAIL,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL
} from '../constants/chatBoxConstants';

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
   console.log(data);
   console.log(" console.log(data);",data.chat._id);
    dispatch({
      type: CREATE_OR_GET_CHAT_SUCCESS,
      payload: data.chat._id
    });
  } catch (error) {
    dispatch({
      type: CREATE_OR_GET_CHAT_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};
export const uploadChatImages = (image) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/v1/chats/uploadChatImages`,
      image,
      config
    );
    return data; // Đảm bảo trả về dữ liệu sau khi upload
  } catch (error) {
    console.log(error);
    return null; // Trả về null nếu có lỗi
  }
};



export const sendMessage = (chatId, formData) => async (dispatch) => {
  try {
    console.log("chatId, formData", chatId, formData);
    dispatch({ type: SEND_MESSAGE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data' // Điều chỉnh thành 'multipart/form-data'
      }
    };

    // Không cần đóng gói lại formData vào đối tượng, chỉ cần truyền formData trực tiếp
    const { data } = await axios.post(`/api/v1/chat/message`, formData, config);

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


export const addMessageIcon = (chatId, messageId, icon) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MESSAGE_ICON_REQUEST });

    const { token } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post('/api/v1/chat/message/add-icon', { chatId, messageId, icon }, config);

    dispatch({
      type: ADD_MESSAGE_ICON_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADD_MESSAGE_ICON_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

// Update message icon
export const updateMessageIcon = (chatId, messageId, newIcon) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_MESSAGE_ICON_REQUEST });

    const { token } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put('/api/v1/chat/message/update-icon', { chatId, messageId, newIcon }, config);

    dispatch({
      type: UPDATE_MESSAGE_ICON_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MESSAGE_ICON_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

// Remove message icon
export const removeMessageIcon = (chatId, messageId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_MESSAGE_ICON_REQUEST });

    const { token } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.delete('/api/v1/chat/message/remove-icon', { data: { chatId, messageId }, ...config });

    dispatch({
      type: REMOVE_MESSAGE_ICON_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REMOVE_MESSAGE_ICON_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

export const searchUsers = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USERS_REQUEST });

    const { data } = await axios.get(`/api/v1/chats/searchUsersByName?name=${query}`);
    console.log("data.users",data.users);
    dispatch({
      type: SEARCH_USERS_SUCCESS,
      payload: data.users
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USERS_FAIL,
      payload: error.response.data.message
    });
  }
};