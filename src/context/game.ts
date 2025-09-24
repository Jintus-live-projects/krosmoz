import { createContext, type ActionDispatch, type ReactElement } from "react";

export type GameAction = {
  type: "complete";
  index: number;
};

export type GameContextType = {
  finalAnswer: string;
  games: Game[];
  currentGameIndex: number;
  dispatch: ActionDispatch<[action: GameAction]>;
  getGame: (index: number, onComplete: () => void) => ReactElement;
};

export type GameState = "locked" | "unlocked" | "completed";

export type Game = {
  hint: string;
  answer: string | undefined;
  state: GameState;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
