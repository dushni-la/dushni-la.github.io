"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Episode } from "@/components/types";

interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  togglePlay: () => void;
  play: (episode: Episode) => void;
  pause: () => void;
  currentTime: number; // current playback time in seconds
  duration: number | null; // duration of the current audio
  seek: (time: number) => void;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const play = (episode: Episode) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop any currently playing episode before starting a new one
    }

    const newAudio = new Audio(episode.audio_url);
    audioRef.current = newAudio;

    newAudio.onended = () => {
      setIsPlaying(false);
    };

    newAudio.ontimeupdate = () => {
      setCurrentTime(newAudio.currentTime);
      setDuration(newAudio.duration);
    };

    newAudio.play();
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    return () => {
      // Clean up the audio when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Stop loading
        audioRef.current = null; // Cleanup reference
      }
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        togglePlay,
        play,
        pause,
        currentTime,
        duration,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
