import React, { useEffect, useRef, useContext } from "react";
import { UserContext } from "../App.jsx";
import themeMusic from "../../assets/LetterGroveTheme.mp3";
import "./BackgroundMusic.css";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    console.log("BackgroundMusic component mounted");
    console.log("Theme music path:", themeMusic);
    console.log("Current userId:", userId);

    if (audioRef.current && userId) {
      audioRef.current.volume = 0.5;

      // Add event listeners for debugging
      audioRef.current.addEventListener("playing", () => {
        console.log("Audio started playing");
      });

      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully");
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("playing", () => {});
        audioRef.current.removeEventListener("error", () => {});
      }
    };
  }, [userId]); // Now depends on userId changes

  return <audio ref={audioRef} src={themeMusic} loop className="background-music" />;
};

export default BackgroundMusic;
