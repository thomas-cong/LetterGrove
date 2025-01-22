import React, { useState, useEffect } from "react";
import { socket } from "../../../client-socket.js";

// params.points is the current points
// Simply render them (TODO: create image to go behind the text)
const PointsCounter = (params) => {
  return (
    <div>
      <span>Points:</span>
      <span>{params.points}</span>
    </div>
  );
};
export default PointsCounter;
