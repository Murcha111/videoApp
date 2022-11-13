import React, { useEffect, useRef } from "react";
import useMeydaAnalyser from "../hooks/useMeydaAnalyser";

export default function Audio() {
  const levelRange = useRef(null);

  const [running, setRunning, features] = useMeydaAnalyser();

  useEffect(() => {
    if (levelRange.current && features) {
      levelRange.current.value = features.rms;
    }
  }, [features]);

  const handleClick = () => {
    setRunning((running) => !running);
  };
  return (
    <div className="audio__container-item">
      <button onClick={handleClick}>
        {!running ? "Start" : "Stop"} microphone
      </button>
      {/* <label htmlFor="level">level</label> */}
      <input
        ref={levelRange}
        type="range"
        id="levelRange"
        name="level"
        min="0.0"
        max="1.0"
        step="0.003"
        defaultValue="0"
      />
    </div>
  );
}
