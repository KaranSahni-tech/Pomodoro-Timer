import { useState, useCallback, useEffect, useRef } from "react";
import alertSound from "./assets/alert.mp3";
import "./App.css";

function App() {
  const [timeleft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  // const [sessionType, SetSessionType] = useState(false);

  const minutes = Math.floor(timeleft / 60);
  const seconds = timeleft % 60;
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alertSound));
  // const startTimer = useCallback(() => {

  //   setIsRunning=true;
  // }, [isRunning, sessionType]
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (timeleft === 0) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((err) => {
        console.log(err);
      });
    }
  }, [timeleft]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  const pauseTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const resetTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const changeSession = (minutes) => {
    // SetSessionType(true);
    setTimeLeft(minutes * 60);
  };

  return (
    <>
      <div className="session">
        <button
          onClick={() => {
            changeSession(1);
          }}
        >
          1 min
        </button>
        <button
          onClick={() => {
            changeSession(5);
          }}
        >
          5 min
        </button>
        <button
          onClick={() => {
            changeSession(10);
          }}
        >
          10 min
        </button>
        <button
          onClick={() => {
            changeSession(15);
          }}
        >
          15 min
        </button>
      </div>
      <div className="parent">
        {" "}
        <p>FOCUS TIMER </p>
        <h1>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <div className="buttons">
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTime}>Stop</button>
          <button onClick={resetTime}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
