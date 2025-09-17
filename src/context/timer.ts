import { createContext, type Dispatch, type SetStateAction } from "react";

export type TimerContextProps = {
  initialTime: number;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  completion: number;
  setCompletion: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextProps>({
  initialTime: 0,
  time: 0,
  setTime: () => {},
  completion: 0,
  setCompletion: () => {},
});
