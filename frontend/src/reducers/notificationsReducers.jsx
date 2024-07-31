import {
  GET_MORE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_RESET,
} from "../constants/notificationConstants";

export const notificationsReducer = (
  state = { latest: [], recent: [] },
  action
) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        latest: action.payload.latestNotifications,
        recent: action.payload.recentNotifications,
      };

    case GET_MORE_NOTIFICATIONS:
      return {
        ...state,
        recent: [...state.recent, ...action.payload],
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
