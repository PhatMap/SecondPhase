import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketManager = () => {
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.connect();

      socket.emit("login", user._id);

      socket.on("newNotification", (notification) => {
        console.log("Received new notification:", notification);
      });

      return () => {
        socket.off("newNotification");
        socket.disconnect();
      };
    }
  }, [socket, user]);

  return null;
};

export default SocketManager;
