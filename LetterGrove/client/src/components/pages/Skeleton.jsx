import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import CreateGameButton from "../modules/CreateGameButton";
import lettergrovelogo from "../../assets/lettergrovelogo.gif";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";
import "../../assets/font.css";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <div>
      <img src={lettergrovelogo} alt="LetterGrove Logo" className="lettergrove-logo" />
      {userId && <CreateGameButton />}
      {userId ? (
        <button
          className="Skeleton-logoutButton"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="Skeleton-loginButton">
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        </div>
      )}
    </div>
  );
};

export default Skeleton;
