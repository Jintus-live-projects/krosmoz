import {
  GameContext,
  type Game,
  type GameAction,
  type GameState,
} from "@/context/game";
import { Motus } from "@/games/motus/motus";
import { Puzzle } from "@/games/puzzle/puzzle";
import { Rebus } from "@/games/rebus/rebus";
import { useReducer, type PropsWithChildren } from "react";

type GameControllerState = {
  games: Game[];
  currentGameIndex: number;
  finalAnswer: string;
  isWin: boolean;
};

function gameStateReducer(state: GameControllerState, action: GameAction) {
  switch (action.type) {
    case "complete": {
      const newGames = state.games.map((game, index) => {
        if (index === action.index) {
          return { ...game, state: "completed" as GameState };
        }
        if (index === action.index + 1) {
          return { ...game, state: "unlocked" as GameState };
        }
        return game;
      });
      return {
        ...state,
        games: newGames,
        currentGameIndex: state.currentGameIndex + 1,
      };
    }
    case "win": {
      return {
        ...state,
        isWin: true,
      };
    }
    default:
      return state;
  }
}

const initialState: GameControllerState = {
  finalAnswer: "pandala",
  currentGameIndex: 0,
  isWin: false,
  games: [
    {
      hint: "spirituelle",
      answer: "spirituelle",
      state: "unlocked",
    },
    {
      hint: "origami",
      answer: "origami",
      state: "locked",
    },
    {
      hint: "dofus",
      answer: undefined,
      state: "locked",
    },
  ],
};

export function GameController(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  function getGame(index: number, onComplete: () => void) {
    function onSuccess() {
      onComplete();
      dispatch({ type: "complete", index });
    }

    const answer = state.games[index]?.answer;

    switch (index) {
      case 0:
        return <Rebus answer={answer!} onSuccess={onSuccess} />;
      case 1:
        return <Motus answer={answer!} onSuccess={onSuccess} />;
      case 2:
        return <Puzzle onSuccess={onSuccess} />;
      default:
        return <div>Rendez vous en terre Pandala</div>;
    }
  }
  return (
    <GameContext.Provider
      value={{
        ...state,
        getGame,
        dispatch,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
