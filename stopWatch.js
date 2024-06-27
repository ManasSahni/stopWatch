import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLapseArr, setTimeLapseArr] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    handleTimeLapse();
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setTimeLapseArr([]);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTimeLapse = () => {
    setTimeLapseArr((prev) => [...prev, formatTime(time)?.toString()]);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p style={{ fontSize: "2em" }}>{formatTime(time)}</p>
      <button
        onClick={startStopwatch}
        disabled={isRunning}
        style={{
          backgroundColor: isRunning ? "lightgrey" : "#d6bce8",
          color: "#663399",
          fontWeight: "bold",
          padding: "8px",
          borderRadius: "7px",
          margin: "5px",
        }}
      >
        Start
      </button>
      <button
        onClick={stopStopwatch}
        disabled={!isRunning}
        style={{
          backgroundColor: !isRunning ? "lightgrey" : "#d6bce8",
          color: "#663399",
          fontWeight: "bold",
          padding: "8px",
          borderRadius: "7px",
          margin: "5px",
        }}
      >
        Stop
      </button>
      <button
        onClick={resetStopwatch}
        style={{
          backgroundColor: "#d6bce8",
          color: "#663399",
          fontWeight: "bold",
          padding: "8px",
          borderRadius: "7px",
          margin: "5px",
        }}
      >
        Reset
      </button>
      {timeLapseArr && timeLapseArr?.length ? (
        <>
          {timeLapseArr?.map((item, idx) => (
            <p key={idx} style={{ fontSize: "1em" }}>
              {item}
            </p>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default Stopwatch;
