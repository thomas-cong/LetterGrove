import React from "react";
import "./HowToPlayPopup.css";
import GameComponent from "../GameComponent/GameComponent";
import InstructionPopup from "./InstructionPopup/InstructionPopup";

const HowToPlayPopup = ({ lobbyCode, userId, closeTutorial }) => {
  const [instructionStep, setInstructionStep] = React.useState(0);
  return (
    <div className="howtoplay-container">
      {instructionStep === 0 && (
        <InstructionPopup
          message={
            <>
              LetterGrove is a word game where you collect points by forming words and collecting
              fruits!{" "}
              <span className="highlight-warning">Let's get started with the tutorial!</span>
            </>
          }
          title="Welcome to LetterGrove!"
          location={1}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 1 && (
        <>
          <InstructionPopup
            message={
              <>
                Notice the tile with the <span className="highlight-gold">golden outline</span>.
                This is a <span className="highlight-goldtile">golden tile</span>. You can only form
                words beginning from
                <span className="highlight-goldtile"> golden tiles</span>. Try{" "}
                <span className="highlight-warning">typing</span> the word{" "}
                <span className="highlight-success">"letter"</span>!
              </>
            }
            title="Golden Tiles and Words (pt. 1)"
            location={1}
            setInstructionStep={setInstructionStep}
            instructionStep={instructionStep}
          />
        </>
      )}
      {instructionStep === 2 && (
        <InstructionPopup
          message={
            <>
              Now click on the <span className="highlight-primary">R</span> to{" "}
              <span className="highlight-warning">place</span> the word and collect the fruits!
            </>
          }
          title="Golden Tiles and Words (pt. 2)"
          location={2}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 3 && (
        <InstructionPopup
          message={
            <>
              <span className="highlight-fruit">Cherries</span> are worth{" "}
              <span className="highlight-points-2">2 pts</span> and{" "}
              <span className="highlight-fruit">Grapes</span> are worth{" "}
              <span className="highlight-points-3">3 pts</span>! Each{" "}
              <span className="highlight-gray">gray letter</span> also has its own point value! You
              can see your score at the top of the page or on the ranking box.
            </>
          }
          title="Points and Scores (pt. 1)"
          location={3}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 4 && (
        <InstructionPopup
          message={
            <>
              Now, try to <span className="highlight-warning">type and place</span> the word{" "}
              <span className="highlight-success">"rang"</span>, and complete the path going down!
            </>
          }
          title="Golden Tiles and Words (pt. 3)"
          location={2}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 5 && (
        <InstructionPopup
          message={
            <>
              <span className="highlight-fruit">Oranges</span> are worth{" "}
              <span className="highlight-points-10">5 pts</span>, and{" "}
              <span className="highlight-fruit">Fruit Crates</span> are worth{" "}
              <span className="highlight-points-20">10 pts</span>! You should prioritize collecting
              these!
            </>
          }
          title="Points and Scores (pt. 2)"
          location={3}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 6 && (
        <InstructionPopup
          message={
            <>
              Now, <span className="highlight-warning">type and place</span> the word{" "}
              <span className="highlight-success">"grove"</span> and move diagonally! In{" "}
              LetterGrove, you can move in all eight directions.
            </>
          }
          title="Golden Tiles and Words (pt. 4)"
          location={3}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 7 && (
        <InstructionPopup
          message={
            <>
              Look at the board! You might have noticed some fruits have spawned on the board. These
              are from the <span className="highlight-powerup">watering can</span> you just
              collected! The <span className="highlight-gold">golden shovel</span> you just
              collected doubles the points of the word that you collected it with.
            </>
          }
          title="Power-ups"
          location={4}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 8 && (
        <InstructionPopup
          message={
            <>
              <span className="highlight-warning">Click</span> on the{" "}
              <span className="highlight-primary">G</span> with the{" "}
              <span className="highlight-gold">golden outline</span>. This takes you to another
              <span className="highlight-goldtile"> golden tile</span>. Now,{" "}
              <span className="highlight-warning">type and place</span> the word{" "}
              <span className="highlight-success">"game"</span>.
            </>
          }
          title="Golden Tiles and Words (pt. 5)"
          location={4}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      {instructionStep === 9 && (
        <InstructionPopup
          message={
            <>
              Great! Now, click on the golden <span className="highlight-primary">E</span> and
              <span className="highlight-warning"> type and place</span> the word{" "}
              <span className="highlight-success">"end"</span>. This completes the tutorial. Have
              fun playing LetterGrove!
            </>
          }
          title="Ending Tutorial"
          location={5}
          setInstructionStep={setInstructionStep}
          instructionStep={instructionStep}
        />
      )}
      <GameComponent
        lobbyCode={lobbyCode}
        userId={userId}
        isTutorial={true}
        closeTutorial={closeTutorial}
      />
    </div>
  );
};

export default HowToPlayPopup;
