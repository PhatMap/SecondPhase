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
  
  export const chatsReducer = (
    state = {
        chats: [],
        chatDetails: [],
        usersInChats: [],
        loading: false,
        error: null,
        success: false
    },
    action
) => {
    switch (action.type) {
        // Lấy danh sách chat
        case GET_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload,
            };
        case GET_CHATS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Lấy chi tiết chat
        case GET_CHAT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CHAT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                chatDetails: action.payload,
            };
        case GET_CHAT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Gửi tin nhắn
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Lấy tất cả người dùng trong các đoạn chat
        case GET_ALL_USERS_IN_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_USERS_IN_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                usersInChats: action.payload,
            };
        case GET_ALL_USERS_IN_CHATS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};