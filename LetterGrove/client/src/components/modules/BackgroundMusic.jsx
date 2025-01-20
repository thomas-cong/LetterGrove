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
  const [hasInteracted, setHasInteracted] = useState(false);

  const playNextTheme = () => {
    if (themeFiles.length > 0) {
      setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themeFiles.length);
    }
  };

  // Effect for handling click events
  useEffect(() => {
    const handleFirstClick = () => {
      console.log("Click detected");
      console.log("hasInteracted:", hasInteracted);
      console.log("audioRef.current:", audioRef.current);

      if (!hasInteracted && audioRef.current) {
        console.log("Attempting to play audio");
        setHasInteracted(true);
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    };

    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, [hasInteracted]);

  // Effect for initial setup and cleanup
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

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

      // Play the new theme when it changes
      if (hasInteracted) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing new theme:", error);
        });
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("playing", onPlaying);
          audioRef.current.removeEventListener("ended", onEnded);
          audioRef.current.removeEventListener("error", onError);
        }
      };
    }
  }, [currentThemeIndex, hasInteracted]);

  return <audio ref={audioRef} src={themeFiles[currentThemeIndex]} preload="auto" loop={false} />;
};
export default BackgroundMusic;
