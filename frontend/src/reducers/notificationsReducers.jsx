import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_RESET,
} from "../constants/notificationConstants";

export const notificationsReducer = (state = { latest: [] }, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        latest: action.payload.latestNotifications,
      };

    case GET_NOTIFICATIONS_RESET:
      return {
        ...state,
        latest: [],
      };

    default:
      return state;
  }
};
