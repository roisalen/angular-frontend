import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

interface StopwatchProps {
  delay?: number;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ delay = 1000 }) => {
  const [clock, setClock] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const offsetRef = useRef<number>(0);

  const start = () => {
    if (!intervalRef.current) {
      offsetRef.current = Date.now();
      intervalRef.current = setInterval(update, delay);
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const reset = () => {
    stop();
    setClock(0);
  };

  const update = () => {
    const now = Date.now();
    const delta = now - offsetRef.current;
    offsetRef.current = now;
    setClock(prevClock => prevClock + delta);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins} m ${secs} s`;
  };

  return (
    <div className="stopwatch">
      <span className="time">{formatTime(clock)}</span>
      {!isRunning ? (
        <Button 
          variant="link" 
          onClick={start}
          className="control-button"
        >
          <span className="glyphicon glyphicon-play"></span>
        </Button>
      ) : (
        <Button 
          variant="link" 
          onClick={stop}
          className="control-button"
        >
          <span className="glyphicon glyphicon-stop"></span>
        </Button>
      )}
      <Button 
        variant="link" 
        onClick={reset}
        className="control-button"
      >
        <span className="glyphicon glyphicon-repeat"></span>
      </Button>
    </div>
  );
}; 