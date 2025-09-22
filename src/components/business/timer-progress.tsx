import { TimerContext } from "@/context/timer";
import { cn } from "@/lib/utils";
import { useContext, type CSSProperties } from "react";

export function TimerProgress() {
  const timerContext = useContext(TimerContext);

  const color =
    timerContext.completion < 0.7
      ? "bg-neutral-50"
      : "bg-red-500 transition-colors duration-500";

  return (
    <div
      className={cn("w-[calc(100%-var(--value))] h-4 justify-self-end", color)}
      style={
        {
          "--value": `${timerContext.completion * 100}%`,
        } as CSSProperties
      }
    ></div>
  );
}
