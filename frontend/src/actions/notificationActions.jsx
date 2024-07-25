import { GET_NOTIFICATIONS } from "../constants/notificationConstants";

export const getNotifications =
  (latestData = []) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: { latestNotifications: latestData },
      });
    } catch (error) {
      console.log(error);
    }
  };
