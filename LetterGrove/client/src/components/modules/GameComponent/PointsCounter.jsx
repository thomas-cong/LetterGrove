import React, { useState, useEffect } from "react";


// params.score is the current score
const ScoreCounter = (props) => {
    const [score, setScore] = useState(0);