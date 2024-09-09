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
  
  export const chatsReducer = (
    state = {
        chats: [],
        currentChatId: null,
        chatDetails: [],
        usersInChats: [],
        searchResults:[],
        loading: false,
        error: null,
        success: false
    },
    action
) => {
    switch (action.type) {
      case SEARCH_USERS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case SEARCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          searchResults: action.payload
        };
      case SEARCH_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
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





            case CREATE_OR_GET_CHAT_SUCCESS:
              return {
                ...state,
                currentChatId: action.payload, // Lấy chatId từ payload
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

            case ADD_MESSAGE_ICON_REQUEST:
                return {
                  ...state,
                  loading: true
                };
              case ADD_MESSAGE_ICON_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  success: true,
                  chatDetails: {
                    ...state.chatDetails,
                    chat: {
                      ...state.chatDetails.chat,
                      messages: state.chatDetails.chat.messages.map(message =>
                        message._id === action.payload.updatedMessage._id ? action.payload.updatedMessage : message
                      )
                    }
                  }
                };
              case ADD_MESSAGE_ICON_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload
                };
          
              // Update message icon
              case UPDATE_MESSAGE_ICON_REQUEST:
                return {
                  ...state,
                  loading: true
                };
              case UPDATE_MESSAGE_ICON_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  success: true,
                  chatDetails: {
                    ...state.chatDetails,
                    chat: {
                      ...state.chatDetails.chat,
                      messages: state.chatDetails.chat.messages.map(message =>
                        message._id === action.payload.updatedMessage._id ? action.payload.updatedMessage : message
                      )
                    }
                  }
                };
              case UPDATE_MESSAGE_ICON_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload
                };
          
              // Remove message icon
              case REMOVE_MESSAGE_ICON_REQUEST:
                return {
                  ...state,
                  loading: true
                };
              case REMOVE_MESSAGE_ICON_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  success: true,
                  chatDetails: {
                    ...state.chatDetails,
                    chat: {
                      ...state.chatDetails.chat,
                      messages: state.chatDetails.chat.messages.map(message =>
                        message._id === action.payload.updatedMessage._id ? action.payload.updatedMessage : message
                      )
                    }
                  }
                };
              case REMOVE_MESSAGE_ICON_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload
                };

        default:
            return state;
    }
};