import { useState } from "react";
import "./App.css";
import { Timer } from "./components/business/timer";
import { TimerContext } from "./context/timer";

function App() {
  const initialTime = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [time, setTime] = useState(initialTime);
  const [completion, setCompletion] = useState(0);

  return (
    <>
      <TimerContext.Provider
        value={{
          initialTime,
          time,
          setTime,
          completion,
          setCompletion,
        }}
      >
        <main className="grid place-items-center">
          <div
            className="bg-red-500 w-[calc(100%-var(--value))] h-4 justify-self-end"
            style={{
              "--value": `${completion * 100}%`,
            }}
          ></div>
          <Timer />
        </main>
      </TimerContext.Provider>
    </>
  );
}

export default App;
