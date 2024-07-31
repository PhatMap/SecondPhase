import axios from "axios";
import {
  GET_MORE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
} from "../constants/notificationConstants";

export const getNotifications = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/notifications/me`);

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: {
        latestNotifications: data.latest,
        recentNotifications: data.recent,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const readNotifications = () => async (dispatch) => {
  try {
    await axios.put(`/api/v1/notifications/me`);
  } catch (error) {
    console.log(error);
  }
};

export const getMoreNotifications = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/v1/notifications?page=${page}&limit=5`
    );

    if (data.more.length > 0) {
      dispatch({
        type: GET_MORE_NOTIFICATIONS,
        payload: data.more,
      });

      return data.more.length;
    } else {
      return data.more.length;
    }
  } catch (error) {
    console.error("Error fetching more notifications:", error);
  }
};
