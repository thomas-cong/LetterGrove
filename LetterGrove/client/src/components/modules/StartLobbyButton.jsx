import React from "react";
import shortSign from "../../assets/sign(320by64).png";
import { post } from "../../utilities";

const StartLobbyButton = (props) => {
  const handleClick = () => {
    console.log(props.gameSettings);
    post("/api/openLobby", { lobbyCode: props.lobbyCode, gameSettings: props.gameSettings }).then(
      (result) => {
        console.log(result.message);
      }
    );
  };
  return (
    <div>
      <img src={shortSign} onClick={handleClick} />
    </div>
  );
};
export default StartLobbyButton;
