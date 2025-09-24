import { useState } from "react";
import "./App.css";
import { GameController } from "./components/business/game-controller";
import { Timer } from "./components/business/timer";
import { TimerProgress } from "./components/business/timer-progress";
import { TimerContext } from "./context/timer";
import { Home } from "./pages/home";

function App() {
  const initialTime = 0.5 * 60 * 1000; // 30 minutes in milliseconds
  const [time, setTime] = useState(initialTime);
  const [completion, setCompletion] = useState(0);
  const [minigameOpen, setMinigameOpen] = useState(false);
  const [hints, setHints] = useState<Array<string | undefined>>([
    undefined,
    undefined,
    undefined,
  ]);

  function onMinigame1Success(hint: string) {
    setMinigameOpen(false);
    const newHints = [...hints];
    newHints[0] = hint;
    setHints(newHints);
  }

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
        <TimerProgress />
        <GameController>
          <main className="grid place-items-center mx-auto w-full relative">
            <Timer className="absolute right-8 top-8" />
            <Home />
          </main>
        </GameController>
      </TimerContext.Provider>
    </>
  );
}

export default App;
