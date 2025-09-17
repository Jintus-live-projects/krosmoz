import { TimerContext } from "@/context/timer";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Duration } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";

const FPS = 60;

export function Timer() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const timerContext = useContext(TimerContext);

  useEffect(() => {
    if (timerContext.time === 0 && intervalId) {
      pause();
    }
  }, [timerContext.time, intervalId]);

  function play() {
    if (intervalId) return; // Prevent multiple intervals

    const interval = setInterval(() => {
      timerContext.setTime((prev) => {
        const newTime = prev - 1000 / FPS;
        const completion =
          (timerContext.initialTime - newTime) / timerContext.initialTime;
        timerContext.setCompletion(Math.min(completion, 1));
        return Math.max(newTime, 0);
      });
    }, 1000 / FPS);

    setIntervalId(interval);
  }

  function pause() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const duration = Duration.fromMillis(timerContext.time);

  return (
    <div className="py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 flex items-center gap-4">
      <span>{duration.toFormat("mm:ss")}</span>
      <Button variant="secondary" size="icon" className="size-8" onClick={play}>
        <PlayIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={pause}
      >
        <PauseIcon />
      </Button>
    </div>
  );
}
