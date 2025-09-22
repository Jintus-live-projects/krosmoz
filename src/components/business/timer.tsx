import { TimerContext } from "@/context/timer";
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { Duration } from "luxon";
import { useContext, useEffect, useState, type ComponentProps } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const FPS = 60;

type Props = ComponentProps<"div">;

export function Timer(props: Props) {
  const { ...htmlProps } = props;

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const timerContext = useContext(TimerContext);
  const isPlaying = intervalId !== null;

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

  function reset() {
    timerContext.setTime(timerContext.initialTime);
    timerContext.setCompletion(0);
    pause();
  }

  function pause() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const duration = Duration.fromMillis(timerContext.time);

  return (
    <Card {...htmlProps}>
      <CardContent className="flex items-center gap-4">
        <span>{duration.toFormat("mm:ss")}</span>
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={reset}
        >
          <RotateCcwIcon />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          disabled={isPlaying}
          onClick={play}
        >
          <PlayIcon />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          disabled={!isPlaying}
          onClick={pause}
        >
          <PauseIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
