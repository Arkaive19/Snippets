import React, { useState, useRef } from "react";

const Watch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalId = useRef(null);

  const formatTime = (n) => n.toString().padStart(2, "0");

  const incrementTime = () => {
    setSeconds((prevSec) => {
      if (prevSec < 59) return prevSec + 1;

      setMinutes((prevMin) => {
        if (prevMin < 59) return prevMin + 1;

        setHours((prevHr) => prevHr + 1);
        return 0;
      });

      return 0;
    });
  };

  const toggleWatch = () => {
    if (isPaused) {
      intervalId.current = setInterval(incrementTime, 1000);
      setHasStarted(true);
      setIsPaused(false);
    } else if (!isPaused && hasStarted) {
      clearInterval(intervalId.current);
      setIsPaused(true);
    }
  };

  const stopWatch = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    setIsPaused(true);
    setHasStarted(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="Watch">
      <div>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <button onClick={toggleWatch}>{isPaused ? "Play" : "Pause"}</button>
      <button onClick={stopWatch}>Stop</button>
    </div>
  );
};

export default Watch;
