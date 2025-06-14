import React, { useState, useRef } from "react";

let Timer = () => {
  let [sec, setSec] = useState(0);
  let [min, setMin] = useState(0);
  let [hr, setHr] = useState(0);
  let [pause, setPause] = useState(true);
  let [adv, setAdv] = useState(false);
  let intervalId = useRef(null);

  const format = (n) => n.toString().padStart(2, "0");
  let secInc = () => {
    setSec((prevSec) => {
      if (prevSec < 59) return prevSec + 1;

      setMin((prevMin) => {
        if (prevMin < 59) return prevMin + 1;

        setHr((prevHr) => prevHr + 1);
        return 0;
      });
      return 0;
    });
  };

  let pauseFunc = () => {
    pause && adv
      ? ((intervalId.current = setInterval(secInc, 1000)), setPause(false))
      : (clearInterval(intervalId.current), setPause(true));
  };

  let playFunc = () => {
    pause
      ? ((intervalId.current = setInterval(secInc, 1000)),
        setPause(false),
        setAdv(true))
      : null;
  };
  let stopFunc = () => {
    intervalId
      ? (clearInterval(intervalId.current),
        setPause(true),
        setHr(0),
        setMin(0),
        setSec(0),
        setAdv(false))
      : null;
  };

  return (
    <>
      <div>
        {format(hr)}:{format(min)}:{format(sec)}
      </div>
      <button className="play" onClick={playFunc}>
        Play
      </button>
      <button className="pause" onClick={pauseFunc}>
        Pause
      </button>
      <button className="stop" onClick={stopFunc}>
        Stop
      </button>
    </>
  );
};

export default Timer;
