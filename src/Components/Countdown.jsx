import React, { useState, useRef } from "react";

const Countdown = () => {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(10);
  const [hours, setHours] = useState(10);
  const [isPaused, setIsPaused] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalId = useRef(null);

  const formatTime = (n) => n.toString().padStart(2, "0");

  const decrementTime = () => {
    setSeconds((prevSec) => {
      if (prevSec > 0) return prevSec - 1;
      setMinutes((prevMin) => {
        if (prevMin > 0) return prevMin - 1;
        setHours((prevHour) => {
          if (prevHour > 0) return prevHour - 1;
        });
      });
      return 59;
    });
  };

  const toggleWatch = () => {
    if (isPaused) {
      intervalId.current = setInterval(decrementTime, 1000);
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
    <div className="Countdown">
      <div>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <button onClick={toggleWatch}>{isPaused ? "Play" : "Pause"}</button>
      <button onClick={stopWatch}>Stop</button>
    </div>
  );
};

export default Countdown;
