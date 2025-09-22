import { useState } from "react";
import "./App.css";
import { MiniGameCard } from "./components/business/mini-game-card";
import { ResultCard } from "./components/business/result-card";
import { Timer } from "./components/business/timer";
import { TimerProgress } from "./components/business/timer-progress";
import { Dialog, DialogContent, DialogTitle } from "./components/ui/dialog";
import { TimerContext } from "./context/timer";
import { Rebus } from "./games/rebus/rebus";

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
        <main className="grid place-items-center mx-auto w-full relative">
          <Timer className="absolute right-8 top-8" />
          <div className="container grid grid-cols-3 gap-8">
            <MiniGameCard
              title="Minigame 1"
              status={hints[0] ? "completed" : "unlocked"}
              hint={hints[0]}
              onStart={() => {
                setMinigameOpen(true);
              }}
            />
            <MiniGameCard title="Minigame 2" status="locked" />
            <MiniGameCard title="Minigame 3" status="locked" />
            <ResultCard
              className="col-span-3"
              hints={hints}
              answer=""
            ></ResultCard>
          </div>
          <Dialog open={minigameOpen} onOpenChange={setMinigameOpen}>
            <DialogContent>
              <DialogTitle>Minigame 1</DialogTitle>
              <Rebus
                answer="tournoi"
                hint="tournoi"
                onSuccess={onMinigame1Success}
              />
            </DialogContent>
          </Dialog>
        </main>
      </TimerContext.Provider>
    </>
  );
}

export default App;
