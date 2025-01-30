import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket, setDisconnectHandler } from "../client-socket";

import { get, post } from "../utilities";

import BackgroundMusic from "./modules/BackgroundMusic";

import DisconnectModal from "./modules/DisconnectModal/DisconnectModal";

import "../assets/font.css";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });

    // Set up disconnect handler
    setDisconnectHandler(() => {
      setShowDisconnectModal(true);
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    // console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <BackgroundMusic />
      <DisconnectModal 
        show={showDisconnectModal} 
        message="You have been disconnected. Please refresh the page to reconnect."
      />
      <Outlet />
    </UserContext.Provider>
  );
};

export default App;
