import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../App.jsx";
import "./BackgroundMusic.css";

// Import theme files directly
import theme1 from "../../assets/Themes/Theme1LetterGrove.mp3";
import theme2 from "../../assets/Themes/ThemeTwoLetterGrove.mp3";

const themeFiles = [theme1, theme2];

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const { userId } = useContext(UserContext);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  
  const playNextTheme = () => {
    if (themeFiles.length > 0) {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themeFiles.length);
    }
  };

  // Effect for initial setup and cleanup
  useEffect(() => {
    console.log("BackgroundMusic component mounted");
    console.log("Current theme:", themeFiles[currentThemeIndex]);
    console.log("Current userId:", userId);
    console.log("Available themes:", themeFiles);

    if (audioRef.current && userId && themeFiles.length > 0) {
      audioRef.current.volume = 0.5;

      // Add event listeners for debugging and theme cycling
      const onPlaying = () => {
        console.log("Audio started playing");
      };

      const onEnded = () => {
        console.log("Theme ended, playing next theme");
        playNextTheme();
      };

      const onError = (e) => {
        console.error("Audio error:", e);
      };

      audioRef.current.addEventListener("playing", onPlaying);
      audioRef.current.addEventListener("ended", onEnded);
      audioRef.current.addEventListener("error", onError);

      // Initial play
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

      // Cleanup function
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("playing", onPlaying);
          audioRef.current.removeEventListener("ended", onEnded);
          audioRef.current.removeEventListener("error", onError);
        }
      };
    }
  }, [userId]); // Only re-run when userId changes

  // Effect to handle theme changes
  useEffect(() => {
    if (audioRef.current && themeFiles.length > 0) {
      audioRef.current.load(); // Load the new source
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing new theme:", error);
        });
      }
    }
  }, [currentThemeIndex]); // Re-run when theme changes

  return themeFiles.length > 0 ? (
    <audio ref={audioRef} src={themeFiles[currentThemeIndex]} className="background-music" />
  ) : null;
};

export default BackgroundMusic;
